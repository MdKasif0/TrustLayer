import { MediaFile, AnalysisSignalType, TrustReport } from "@/lib/types";
import {
  AnalysisOptions,
  ImageAnalysisResult,
  VideoAnalysisResult,
  MetadataAnalysisResult,
  ProvenanceAnalysisResult,
  ForensicsAnalysisResult,
} from "./types";

/**
 * Base abstract contract for TrustLayer verification providers.
 * Decouples the frontend interface from underlying AI models, microservices,
 * and external C2PA or metadata parsing engines.
 */
export interface AnalysisProvider {
  readonly name: string;
  readonly isDemo: boolean;

  /**
   * Primary end-to-end multi-signal verification pipeline.
   */
  analyzeMedia(
    media: MediaFile,
    activeSignals: AnalysisSignalType[],
    options?: AnalysisOptions
  ): Promise<TrustReport>;

  /**
   * Specialized AI generation analysis for still images.
   */
  analyzeImage(file: File | Blob, options?: AnalysisOptions): Promise<ImageAnalysisResult>;

  /**
   * Specialized AI generation analysis for video files.
   */
  analyzeVideo(file: File | Blob, options?: AnalysisOptions): Promise<VideoAnalysisResult>;

  /**
   * File-level metadata, EXIF, XMP, and quantization inspection.
   */
  analyzeMetadata(file: File | Blob): Promise<MetadataAnalysisResult>;

  /**
   * C2PA / Content Authenticity Initiative provenance manifest inspection.
   */
  analyzeProvenance(file: File | Blob): Promise<ProvenanceAnalysisResult>;

  /**
   * Forensic visual inconsistencies, ELA, and sensor PRNU analysis.
   */
  analyzeForensics(file: File | Blob): Promise<ForensicsAnalysisResult>;
}
