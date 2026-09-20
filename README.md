# TrustLayer — Digital Media Verification

> Multi-signal digital media verification platform combining AI detection, cryptographic provenance, file metadata, and forensic indicators into a transparent, evidence-based assessment.

---

## 1. Overview & Architecture

TrustLayer does not attempt to answer authenticity with a single classifier. In adversarial, real-world media environments, isolated neural networks are easily deceived by unseen generation architectures, benign compression, and localized editing.

TrustLayer treats verification as a structured multi-signal forensic inquiry across four independent channels:

1. **AI Detection**: Dual-domain spectral decomposition (DCT/FFT), universal latent visual feature projections (CLIP ViT), and checkerboard lattice attenuation analysis.
2. **Provenance (C2PA)**: Cryptographic manifest inspection (ISO/IEC 23008-12 JUMBF), X.509 PKI trust chain validation, and hardware keystore signature verification.
3. **Metadata**: Container structural parsing (EXIF, XMP, IPTC) and JPEG Discrete Quantization Table (DQT) firmware profile matching.
4. **Forensics**: Error Level Analysis (ELA) re-compression variance, Photo Response Non-Uniformity (PRNU) sensor pattern noise consistency, and temporal video coherence.

---

## 2. Local Development

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/MdKasif0/TrustLayer.git
cd TrustLayer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the workspace.

---

## 3. Production Build

```bash
# Run type checking
npx tsc --noEmit

# Compile production bundle
npm run build

# Start production server locally
npm start
```

---

## 4. Netlify Deployment & Configuration

TrustLayer is built with a Netlify-compatible architecture. All server-side API proxy routes use standard web `Request` and `NextResponse` primitives without native binary dependencies.

### Netlify Deployment Steps
1. Connect your GitHub repository to Netlify.
2. Set the build command to `npm run build`.
3. Set the publish directory to `.next`.
4. Netlify automatically detects Next.js via the `@netlify/plugin-nextjs` plugin defined in `netlify.toml`.

### Netlify Environment Variables

Configure these variables in **Site configuration → Environment variables** in your Netlify dashboard:

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_DEMO_MODE` | No | `true` | When `true`, executes deterministic demo analysis with full UI functionality (upload, timeline, reports, permalinks) without external credentials. Set to `false` for live production. |
| `NEXT_PUBLIC_SITE_URL` | No | Site URL | Canonical URL of the deployed application (used for sitemap and Open Graph metadata). |
| `PYTHON_BACKEND_URL` | No | None | Internal URL of upstream Python/FastAPI ML microservice (kept strictly server-side, never leaked to client). |
| `TRUSTLAYER_API_URL` | No | None | URL of enterprise TrustLayer API gateway. |
| `TRUSTLAYER_API_KEY` | No | None | Private bearer token / secret key for authenticating server proxy requests to upstream microservices. |
| `C2PA_SERVICE_URL` | No | None | Endpoint for standalone Rust `c2pa-rs` manifest inspection microservice. |
| `METADATA_SERVICE_URL` | No | None | Endpoint for standalone ExifTool metadata parsing microservice. |

> **Security Guarantee**: Vendor API tokens and internal microservice URLs are resolved strictly inside Next.js server route handlers (`src/app/api/analyze/route.ts`) and are never bundled into client-side JavaScript.

---

## 5. Responsible Use & Technical Limitations

- **Detection is probabilistic**: Machine learning classifiers output likelihood distributions based on empirical training sets. No statistical model guarantees 100% certainty.
- **New generation methods evolve**: Zero-day generative diffusion schedulers and upscalers may exhibit distributions not captured in existing research benchmarks.
- **Compression affects evidence**: Social media transcoding discards high-frequency DCT coefficients and attenuates sensor noise floors.
- **Benign editing alters baselines**: Routine cropping, color grading, and format re-saving modify quantization tables without constituting synthetic fraud.
- **Missing provenance is common**: The vast majority of consumer media online lacks C2PA credentials; missing provenance is never evidence of manipulation.
- **Human-in-the-loop**: TrustLayer is an investigative decision-support system designed to empower human analysts, journalists, and forensic examiners—not to replace human judgment.

---

## 6. License & Research Attribution

Released under the [MIT License](LICENSE). Methodology synthesized from peer-reviewed literature including Wang et al. (CVPR 2020), Ojha et al. (CVPR 2023), FaceForensics++ (ICCV 2019), DeepfakeBench (NeurIPS 2023), and standards by NIST and C2PA.
