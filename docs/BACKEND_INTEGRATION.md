# TrustLayer Backend & AI Model Integration Guide

This guide outlines how to replace `DemoAnalysisProvider` with real AI models, computer vision pipelines, C2PA manifest parsers, and Python/FastAPI microservices.

---

## 1. Architectural Overview

TrustLayer is built with a decoupled, provider-based architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                       Client (Browser)                      │
│                                                             │
│  UploadArea ──► AnalysisProgressScreen ──► AssessmentReport │
└──────────────────────────────┬──────────────────────────────┘
                               │
               getAnalysisProvider() [types.ts]
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌─────────────────────────┐           ┌─────────────────────────┐
│   DemoAnalysisProvider   │           │   ApiAnalysisProvider   │
│ (NEXT_PUBLIC_DEMO_MODE) │           │ (Live Mode / Production)│
│  - Deterministic rules  │           └───────────┬─────────────┘
│  - DEMO ANALYSIS tag    │                       │
└─────────────────────────┘                       │ POST /api/analyze
                                                  ▼
┌─────────────────────────────────────────────────────────────┐
│             Next.js Server Proxy (Netlify-Ready)            │
│                 src/app/api/analyze/route.ts                │
│                                                             │
│  • Keeps TRUSTLAYER_API_KEY & internal URLs private         │
│  • Validates media containers & MIME signatures             │
│  • Dispatches to upstream microservices                     │
└──────────────────────────────┬──────────────────────────────┘
                               │
      ┌────────────────────────┼────────────────────────┐
      ▼                        ▼                        ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────────┐
│ Python/FastAPI│      │  C2PA Service │      │  Computer Vision  │
│  AI Detection │      │   (c2pa-rs)   │      │  & Metadata Engine│
│   (PyTorch)   │      │ CAI Manifests │      │ (ExifTool / OpenCV│
└───────────────┘      └───────────────┘      └───────────────────┘
```

---

## 2. Configuration & Environment Variables

### Switching from Demo Mode to Live Mode
In your environment (or Netlify Environment Variables dashboard):

```bash
# Set Demo Mode to false to route requests through live providers
NEXT_PUBLIC_DEMO_MODE=false

# Internal Backend Credentials (Server-only, NEVER exposed to client)
PYTHON_BACKEND_URL=https://models.trustlayer.internal
TRUSTLAYER_API_URL=https://api.trustlayer.internal
TRUSTLAYER_API_KEY=tl_live_prod_sec_89f0291a78c12b

# Optional standalone microservices
C2PA_SERVICE_URL=http://c2pa-validator.internal:8081
METADATA_SERVICE_URL=http://exif-parser.internal:8082
```

---

## 3. Pluggable Service Interfaces

The core contracts are defined in [`src/lib/analysis/types.ts`](../src/lib/analysis/types.ts):

### AI Detection Service
```typescript
export interface AiDetectionService {
  readonly serviceName: string;
  detectSyntheticImage(imageBuffer: ArrayBuffer | Blob): Promise<ImageAnalysisResult>;
  detectSyntheticVideo(videoBuffer: ArrayBuffer | Blob): Promise<VideoAnalysisResult>;
}
```

### C2PA Provenance Parser
```typescript
export interface C2paParserService {
  readonly serviceName: string;
  inspectManifest(fileBuffer: ArrayBuffer | Blob): Promise<ProvenanceAnalysisResult>;
}
```

### Metadata & Forensics Services
```typescript
export interface MetadataParserService {
  readonly serviceName: string;
  extractHeaders(fileBuffer: ArrayBuffer | Blob): Promise<MetadataAnalysisResult>;
}

export interface ComputerVisionForensicsService {
  readonly serviceName: string;
  runErrorLevelAnalysis(imageBuffer: ArrayBuffer | Blob, baselineQuality?: number): Promise<{ varianceDelta: number; heatmapUrl?: string }>;
  analyzePrnuNoise(imageBuffer: ArrayBuffer | Blob): Promise<{ isContiguous: boolean; quadrantDeltas: number[] }>;
}
```

---

## 4. Python / FastAPI Microservice Template

Here is a ready-to-deploy FastAPI microservice demonstrating how to accept multipart media from TrustLayer and return compliant assessments:

```python
# main.py
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Header
import uvicorn
import json

app = FastAPI(title="TrustLayer Live Analysis Engine", version="1.0.0")

@app.post("/verify")
async def verify_media(
    file: UploadFile = File(None),
    action: str = Form("analyze-media"),
    activeSignals: str = Form("[]"),
    metadata: str = Form("{}"),
    authorization: str = Header(None)
):
    # 1. Validate server-side API Key
    # if authorization != f"Bearer {EXPECTED_SECRET}":
    #     raise HTTPException(status_code=401, detail="Unauthorized")

    signals = json.loads(activeSignals)
    meta = json.loads(metadata)

    # 2. Read bytes for ML models
    content = await file.read() if file else b""

    # 3. Execute PyTorch / OpenCV / c2pa-rs models
    # ai_findings = run_diffusion_artifact_detector(content)
    # c2pa_manifest = run_c2pa_manifest_inspector(content)
    # forensics_ela = run_error_level_analysis(content)

    # 4. Return structured TrustReport payload matching TrustLayer schema
    return {
        "id": f"report-{file.filename}",
        "reportReferenceId": f"TL-2026-LIVE",
        "mediaFile": {
            "id": meta.get("id", "media-1"),
            "name": file.filename if file else "uploaded-file",
            "size": len(content),
            "type": file.content_type if file else "image/jpeg",
            "extension": file.filename.split(".")[-1].upper() if file else "JPG",
            "mediaKind": "video" if file and file.filename.endswith((".mp4", ".mov")) else "image",
            "previewUrl": "",
            "width": 1920,
            "height": 1080,
            "hashSha256": "computed_sha256_hash_here"
        },
        "analyzedAt": "2026-09-21T02:00:00.000Z",
        "formattedAnalyzedAt": "September 21, 2026 at 02:00 AM UTC",
        "executionDurationMs": 2150,
        "overallTrustLevel": "suspicious",
        "overallAssessment": "POTENTIALLY SYNTHETIC / MANIPULATED",
        "assessmentConfidence": "MODERATE",
        "evidenceStrengthLabel": "MULTIPLE SIGNALS",
        "overallConfidence": 79,
        "verdictTitle": "Potentially Synthetic / Manipulated",
        "verdictSummary": "Spectral Fourier anomalies and localized ELA inconsistencies detected.",
        "activeSignals": signals,
        "signalResults": [
            {
                "signalId": "ai-detection",
                "signalLabel": "AI DETECTION",
                "signalValue": "HIGH",
                "status": "flagged",
                "strength": "strong",
                "confidence": 85,
                "summary": "Visual patterns associated with synthetic media were detected.",
                "items": [],
                "anomalyDetected": True,
                "qualitativeState": "detected"
            }
        ],
        "evidenceTimeline": [],
        "keyFindings": [
            "AI Detection: Fourier spectrum exhibits high-frequency lattice signatures.",
            "Forensics: Localized Error Level Analysis variance elevated by 24%."
        ],
        "disclaimer": "TrustLayer provides an evidence-based assessment, not absolute certainty."
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## 5. Integrating C2PA / Content Credentials

To inspect C2PA manifests without executing unsafe binaries in serverless functions:
1. Run a lightweight Rust microservice wrapping [`c2pa-rs`](https://github.com/contentauth/c2pa-rs) or use Adobe's Content Authenticity Initiative CLI (`c2patool`).
2. Point `C2PA_SERVICE_URL` to this service.
3. The server proxy route (`/api/analyze`) dispatches the media stream to the C2PA parser.
4. If no JUMBF container exists, the parser returns `ProvenanceState: "Not found"`.
5. **Critical TrustLayer Rule**: The parser and frontend NEVER equate "Not found" with fraudulent media.

---

## 6. Netlify Serverless Compatibility

- All proxy logic lives in standard Next.js App Router route handlers (`/api/analyze/route.ts`).
- Standard web `fetch`, `FormData`, `Request`, and `NextResponse` APIs are used exclusively.
- No native C++ or Node-gyp bindings are packaged into the frontend bundle.
- Long-running inference jobs should run on dedicated worker instances (e.g., RunPod, AWS ECS, GCP Cloud Run) with the Next.js API acting as the secure gateway.

---

## 7. Demo Mode Safety Guarantee

When `NEXT_PUBLIC_DEMO_MODE=true`:
- Every report is stamped with `[DEMO ANALYSIS]` markers.
- Report IDs include the `-DEMO` suffix.
- No fabricated numerical benchmark accuracy claims (e.g., "99.8% precision") are presented.
- Local storage caching allows developers and users to test the entire lifecycle (upload → progress → report → permalink) with zero external setup.
