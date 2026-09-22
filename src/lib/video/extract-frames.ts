/**
 * Client-Side Video Frame Sampling Utility
 *
 * Extracts representative frames across the video timeline (Beginning, 25%, 50%, 75%, End)
 * using HTML5 Video + Offscreen Canvas without external ffmpeg or heavy wasm binaries.
 */

export interface ExtractedVideoFrame {
  blob: Blob;
  dataUrl: string;
  timestamp: number;
  label: string;
  width: number;
  height: number;
}

export async function extractRepresentativeVideoFrames(
  videoFile: File | Blob,
  maxFrames = 5
): Promise<ExtractedVideoFrame[]> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const objectUrl = URL.createObjectURL(videoFile);
    video.src = objectUrl;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Video frame extraction timed out after 30 seconds."));
    }, 30000);

    function cleanup() {
      clearTimeout(timeout);
      URL.revokeObjectURL(objectUrl);
      video.remove();
    }

    video.onloadedmetadata = async () => {
      try {
        const duration = video.duration || 1;
        const width = video.videoWidth || 640;
        const height = video.videoHeight || 360;

        // Downscale to max 1280px for fast transmission and efficient token usage
        const scale = Math.min(1, 1280 / Math.max(width, height));
        const targetWidth = Math.round(width * scale);
        const targetHeight = Math.round(height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          cleanup();
          return reject(new Error("Failed to initialize canvas 2D rendering context."));
        }

        // Calculate sample timestamps
        const timestamps: Array<{ time: number; label: string }> = [];
        if (maxFrames <= 1 || duration < 1) {
          timestamps.push({ time: Math.min(0.5, duration / 2), label: "Middle" });
        } else if (maxFrames === 3) {
          timestamps.push({ time: 0.1, label: "Beginning (0.1s)" });
          timestamps.push({ time: duration * 0.5, label: `50% (${(duration * 0.5).toFixed(1)}s)` });
          timestamps.push({ time: Math.max(0.2, duration - 0.3), label: `End (${(duration - 0.3).toFixed(1)}s)` });
        } else {
          // Default 5 frames
          timestamps.push({ time: 0.1, label: "Beginning (0.1s)" });
          timestamps.push({ time: duration * 0.25, label: `25% (${(duration * 0.25).toFixed(1)}s)` });
          timestamps.push({ time: duration * 0.5, label: `50% (${(duration * 0.5).toFixed(1)}s)` });
          timestamps.push({ time: duration * 0.75, label: `75% (${(duration * 0.75).toFixed(1)}s)` });
          timestamps.push({ time: Math.max(0.2, duration - 0.3), label: `End (${(duration - 0.3).toFixed(1)}s)` });
        }

        const frames: ExtractedVideoFrame[] = [];

        for (const item of timestamps) {
          await seekToTime(video, item.time);
          ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

          const blob = await canvasToBlob(canvas, "image/jpeg", 0.85);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

          frames.push({
            blob,
            dataUrl,
            timestamp: item.time,
            label: item.label,
            width: targetWidth,
            height: targetHeight,
          });
        }

        cleanup();
        resolve(frames);
      } catch (extractErr) {
        cleanup();
        reject(extractErr);
      }
    };

    video.onerror = () => {
      cleanup();
      reject(new Error("Unable to decode video format for frame extraction."));
    };
  });
}

function seekToTime(video: HTMLVideoElement, timeSeconds: number): Promise<void> {
  return new Promise((resolve) => {
    const onSeeked = () => {
      video.removeEventListener("seeked", onSeeked);
      resolve();
    };
    video.addEventListener("seeked", onSeeked);
    video.currentTime = Math.max(0, timeSeconds);
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to convert canvas frame to Blob."));
      },
      type,
      quality
    );
  });
}
