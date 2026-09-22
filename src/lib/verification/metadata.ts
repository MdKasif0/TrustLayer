import { MetadataSignal, FileMetadata } from "./types";

/**
 * Real Binary Metadata Extractor (Zero-Dependency)
 *
 * Inspects binary buffers for:
 * - JPEG EXIF (APP1 0xFFE1 TIFF header, IFD0 & ExifIFD tags)
 * - JPEG XMP (APP1 0xFFE1 RDF XML tags)
 * - JPEG SOF0/SOF2 (Frame dimensions)
 * - PNG IHDR & tEXt/iTXt metadata chunks
 * - WebP VP8/VP8X dimensions and EXIF chunks
 */

const KNOWN_EDITING_SOFTWARE = [
  "photoshop",
  "lightroom",
  "gimp",
  "canva",
  "procreate",
  "affinity",
  "figma",
  "sketch",
  "coreldraw",
  "pixelmator",
  "snapseed",
  "vsco",
  "midjourney",
  "stable diffusion",
  "dall-e",
  "automatic1111",
  "comfyui",
  "blender",
];

export function extractMetadata(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
  providedDimensions?: { width?: number; height?: number }
): MetadataSignal {
  const isJpeg = mimeType.includes("jpeg") || mimeType.includes("jpg") || (buffer.length > 2 && buffer[0] === 0xff && buffer[1] === 0xd8);
  const isPng = mimeType.includes("png") || (buffer.length > 4 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47);
  const isWebp = mimeType.includes("webp") || (buffer.length > 12 && buffer.slice(0, 4).toString("ascii") === "RIFF" && buffer.slice(8, 12).toString("ascii") === "WEBP");

  const metadata: FileMetadata = {
    fileType: isJpeg ? "JPEG" : isPng ? "PNG" : isWebp ? "WEBP" : mimeType.toUpperCase(),
    mimeType,
    fileSizeBytes: buffer.length,
    formattedSize: formatBytes(buffer.length),
    dimensions: providedDimensions?.width && providedDimensions?.height ? { width: providedDimensions.width, height: providedDimensions.height } : undefined,
    cameraMake: undefined,
    cameraModel: undefined,
    software: undefined,
    creationDate: undefined,
    colorProfile: undefined,
    orientation: undefined,
    hasExif: false,
    hasXmp: false,
    hasIptc: false,
    rawTags: {},
  };

  if (isJpeg) {
    parseJpegMetadata(buffer, metadata);
  } else if (isPng) {
    parsePngMetadata(buffer, metadata);
  } else if (isWebp) {
    parseWebpMetadata(buffer, metadata);
  }

  // Fallback to provided dimensions if parser didn't extract them
  if (!metadata.dimensions && providedDimensions?.width && providedDimensions?.height) {
    metadata.dimensions = { width: providedDimensions.width, height: providedDimensions.height };
  }

  // Detect editing software
  let editingSoftwareDetected = false;
  let editingSoftwareName: string | undefined;

  const softwareField = metadata.software || metadata.rawTags["Software"] || metadata.rawTags["CreatorTool"];
  if (softwareField) {
    const lower = softwareField.toLowerCase();
    for (const app of KNOWN_EDITING_SOFTWARE) {
      if (lower.includes(app)) {
        editingSoftwareDetected = true;
        editingSoftwareName = softwareField;
        break;
      }
    }
  }

  // Compile evidence bullets
  const evidence: string[] = [];
  const limitations: string[] = [];

  if (metadata.hasExif) {
    evidence.push(`EXIF data structure detected.`);
    if (metadata.cameraMake || metadata.cameraModel) {
      evidence.push(`Hardware acquisition tag: ${[metadata.cameraMake, metadata.cameraModel].filter(Boolean).join(" ")}`);
    } else {
      evidence.push(`Camera hardware tags (Make/Model): Unavailable`);
    }
  } else {
    evidence.push(`EXIF metadata: Not present in file container.`);
  }

  if (metadata.hasXmp) {
    evidence.push(`XMP extensible metadata packet present.`);
  }

  if (editingSoftwareDetected && editingSoftwareName) {
    evidence.push(`Editing-software metadata detected: "${editingSoftwareName}".`);
    limitations.push(
      `Post-processing software metadata indicates that the media was processed or saved using editing tools (${editingSoftwareName}). This is common in authentic professional workflows and does not in itself establish synthetic origin.`
    );
  } else if (softwareField) {
    evidence.push(`Software container tag: "${softwareField}".`);
  } else {
    evidence.push(`Software identifier tag: Unavailable.`);
  }

  if (metadata.creationDate) {
    evidence.push(`Original creation timestamp: ${metadata.creationDate}`);
  } else {
    evidence.push(`Original creation timestamp: Unavailable`);
  }

  if (metadata.dimensions) {
    evidence.push(`Visual dimensions: ${metadata.dimensions.width} × ${metadata.dimensions.height} pixels.`);
  }

  limitations.push(
    `Metadata can be stripped, preserved, or spoofed by standard compression tools, social media pipelines, or malicious actors. Lack of camera metadata does not prove manipulation.`
  );

  const status = metadata.hasExif || metadata.hasXmp || editingSoftwareDetected ? "reviewed" : "sparse";

  return {
    status,
    editingSoftwareDetected,
    editingSoftwareName,
    metadata,
    evidence,
    limitations,
  };
}

function parseJpegMetadata(buffer: Buffer, metadata: FileMetadata): void {
  let offset = 2; // Skip SOI (0xFFD8)

  while (offset < buffer.length - 4) {
    if (buffer[offset] !== 0xff) {
      offset++;
      continue;
    }

    const marker = buffer[offset + 1];

    if (marker === 0xda || marker === 0xd9) break; // SOS or EOI
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }

    const length = buffer.readUInt16BE(offset + 2);
    if (length < 2 || offset + 2 + length > buffer.length) break;

    const segment = buffer.slice(offset + 4, offset + 2 + length);

    // APP1: EXIF or XMP
    if (marker === 0xe1) {
      if (segment.length > 6 && segment.slice(0, 4).toString("ascii") === "Exif") {
        metadata.hasExif = true;
        parseExifTiff(segment.slice(6), metadata);
      } else if (segment.length > 28 && segment.toString("utf8", 0, 28).includes("http://ns.adobe.com/xap/1.0/")) {
        metadata.hasXmp = true;
        parseXmpXml(segment.toString("utf8"), metadata);
      }
    }

    // APP13: IPTC
    if (marker === 0xed) {
      if (segment.length > 14 && segment.slice(0, 14).toString("ascii").includes("Photoshop 3.0")) {
        metadata.hasIptc = true;
      }
    }

    // SOF0 (0xFFC0) or SOF2 (0xFFC2): Start of Frame (Baseline/Progressive Dimensions)
    if (marker === 0xc0 || marker === 0xc2) {
      if (segment.length >= 5) {
        const height = segment.readUInt16BE(1);
        const width = segment.readUInt16BE(3);
        if (width > 0 && height > 0) {
          metadata.dimensions = { width, height };
        }
      }
    }

    offset += 2 + length;
  }
}

function parseExifTiff(tiffBuffer: Buffer, metadata: FileMetadata): void {
  if (tiffBuffer.length < 8) return;

  const isLittleEndian = tiffBuffer[0] === 0x49 && tiffBuffer[1] === 0x49; // 'II'
  const isBigEndian = tiffBuffer[0] === 0x4d && tiffBuffer[1] === 0x4d; // 'MM'
  if (!isLittleEndian && !isBigEndian) return;

  const readU16 = (o: number) => (isLittleEndian ? tiffBuffer.readUInt16LE(o) : tiffBuffer.readUInt16BE(o));
  const readU32 = (o: number) => (isLittleEndian ? tiffBuffer.readUInt32LE(o) : tiffBuffer.readUInt32BE(o));

  const magic = readU16(2);
  if (magic !== 0x002a) return;

  const ifd0Offset = readU32(4);
  if (ifd0Offset + 2 > tiffBuffer.length) return;

  const numEntries = readU16(ifd0Offset);
  let subIfdOffset: number | undefined;

  for (let i = 0; i < numEntries; i++) {
    const entryOffset = ifd0Offset + 2 + i * 12;
    if (entryOffset + 12 > tiffBuffer.length) break;

    const tag = readU16(entryOffset);
    const type = readU16(entryOffset + 2);
    const count = readU32(entryOffset + 4);
    const valueOffset = readU32(entryOffset + 8);

    const stringVal = type === 2 ? readTiffString(tiffBuffer, count, valueOffset, entryOffset + 8) : undefined;

    switch (tag) {
      case 0x010f: // Make
        if (stringVal) {
          metadata.cameraMake = stringVal;
          metadata.rawTags["Make"] = stringVal;
        }
        break;
      case 0x0110: // Model
        if (stringVal) {
          metadata.cameraModel = stringVal;
          metadata.rawTags["Model"] = stringVal;
        }
        break;
      case 0x0131: // Software
        if (stringVal) {
          metadata.software = stringVal;
          metadata.rawTags["Software"] = stringVal;
        }
        break;
      case 0x0132: // DateTime
        if (stringVal) {
          metadata.rawTags["ModifyDate"] = stringVal;
          if (!metadata.creationDate) metadata.creationDate = stringVal;
        }
        break;
      case 0x0112: // Orientation
        metadata.orientation = `${readU16(entryOffset + 8)}`;
        break;
      case 0x8769: // Exif SubIFD Offset
        subIfdOffset = valueOffset;
        break;
    }
  }

  // Parse SubIFD if present
  if (subIfdOffset && subIfdOffset + 2 <= tiffBuffer.length) {
    const numSubEntries = readU16(subIfdOffset);
    for (let i = 0; i < numSubEntries; i++) {
      const entryOffset = subIfdOffset + 2 + i * 12;
      if (entryOffset + 12 > tiffBuffer.length) break;

      const tag = readU16(entryOffset);
      const type = readU16(entryOffset + 2);
      const count = readU32(entryOffset + 4);
      const valueOffset = readU32(entryOffset + 8);

      const stringVal = type === 2 ? readTiffString(tiffBuffer, count, valueOffset, entryOffset + 8) : undefined;

      switch (tag) {
        case 0x9003: // DateTimeOriginal
          if (stringVal) {
            metadata.creationDate = stringVal;
            metadata.rawTags["DateTimeOriginal"] = stringVal;
          }
          break;
        case 0xa001: // ColorSpace
          const cs = readU16(entryOffset + 8);
          metadata.colorProfile = cs === 1 ? "sRGB" : cs === 0xffff ? "Uncalibrated / Adobe RGB" : `ID ${cs}`;
          break;
        case 0xa002: // PixelXDimension
          if (!metadata.dimensions) {
            const w = type === 3 ? readU16(entryOffset + 8) : valueOffset;
            const h = type === 3 ? readU16(entryOffset + 20) : 0;
            if (w > 0) metadata.dimensions = { width: w, height: h || w };
          }
          break;
      }
    }
  }
}

function readTiffString(buffer: Buffer, count: number, valueOffset: number, inlineOffset: number): string | undefined {
  if (count <= 4) {
    return buffer.toString("utf8", inlineOffset, inlineOffset + count).replace(/\0+$/, "").trim();
  }
  if (valueOffset + count <= buffer.length) {
    return buffer.toString("utf8", valueOffset, valueOffset + count).replace(/\0+$/, "").trim();
  }
  return undefined;
}

function parseXmpXml(xmpText: string, metadata: FileMetadata): void {
  // CreatorTool / Software
  const toolMatch = xmpText.match(/CreatorTool="([^"]+)"/) || xmpText.match(/<xmp:CreatorTool>([^<]+)<\/xmp:CreatorTool>/);
  if (toolMatch && toolMatch[1]) {
    metadata.software = metadata.software || toolMatch[1].trim();
    metadata.rawTags["CreatorTool"] = toolMatch[1].trim();
  }

  // CreateDate
  const dateMatch = xmpText.match(/CreateDate="([^"]+)"/) || xmpText.match(/<xmp:CreateDate>([^<]+)<\/xmp:CreateDate>/);
  if (dateMatch && dateMatch[1]) {
    metadata.creationDate = metadata.creationDate || dateMatch[1].trim();
    metadata.rawTags["CreateDate"] = dateMatch[1].trim();
  }

  // Make / Model from XMP
  const makeMatch = xmpText.match(/Make="([^"]+)"/) || xmpText.match(/<tiff:Make>([^<]+)<\/tiff:Make>/);
  if (makeMatch && makeMatch[1] && !metadata.cameraMake) {
    metadata.cameraMake = makeMatch[1].trim();
  }

  const modelMatch = xmpText.match(/Model="([^"]+)"/) || xmpText.match(/<tiff:Model>([^<]+)<\/tiff:Model>/);
  if (modelMatch && modelMatch[1] && !metadata.cameraModel) {
    metadata.cameraModel = modelMatch[1].trim();
  }
}

function parsePngMetadata(buffer: Buffer, metadata: FileMetadata): void {
  let offset = 8; // Skip PNG 8-byte signature

  while (offset + 8 < buffer.length) {
    const chunkLength = buffer.readUInt32BE(offset);
    const chunkType = buffer.slice(offset + 4, offset + 8).toString("ascii");

    if (chunkType === "IHDR" && chunkLength >= 8) {
      const width = buffer.readUInt32BE(offset + 8);
      const height = buffer.readUInt32BE(offset + 12);
      metadata.dimensions = { width, height };
    }

    if (chunkType === "tEXt" || chunkType === "iTXt") {
      const data = buffer.slice(offset + 8, offset + 8 + chunkLength);
      const text = data.toString("utf8");
      const nullIdx = text.indexOf("\0");
      if (nullIdx > 0) {
        const keyword = text.slice(0, nullIdx);
        const value = text.slice(nullIdx + 1).replace(/\0+/g, " ").trim();
        metadata.rawTags[keyword] = value;
        if (keyword.toLowerCase().includes("software")) {
          metadata.software = value;
        }
      }
    }

    if (chunkType === "IEND") break;
    offset += 8 + chunkLength + 4;
  }
}

function parseWebpMetadata(buffer: Buffer, metadata: FileMetadata): void {
  // WebP RIFF Header
  let offset = 12;

  while (offset + 8 < buffer.length) {
    const chunkFourCC = buffer.slice(offset, offset + 4).toString("ascii");
    const chunkSize = buffer.readUInt32LE(offset + 4);

    if (chunkFourCC === "VP8X" && chunkSize >= 10) {
      const w = buffer.readUIntLE(offset + 12, 3) + 1;
      const h = buffer.readUIntLE(offset + 15, 3) + 1;
      metadata.dimensions = { width: w, height: h };
    } else if (chunkFourCC === "EXIF") {
      metadata.hasExif = true;
      parseExifTiff(buffer.slice(offset + 8, offset + 8 + chunkSize), metadata);
    } else if (chunkFourCC === "XMP ") {
      metadata.hasXmp = true;
      parseXmpXml(buffer.slice(offset + 8, offset + 8 + chunkSize).toString("utf8"), metadata);
    }

    const paddedSize = chunkSize + (chunkSize % 2);
    offset += 8 + paddedSize;
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
