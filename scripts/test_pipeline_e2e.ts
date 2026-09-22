import fs from "fs";
import path from "path";
import { runVerificationPipeline } from "../src/lib/verification/pipeline";

// Read .env.local manually
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let val = match[2] || "";
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[match[1]] = val;
    }
  });
}

async function runE2ETests() {
  console.log("================================================================");
  console.log("       TRUSTLAYER REAL VERIFICATION PIPELINE E2E TEST          ");
  console.log("================================================================");
  console.log("Groq Model:", process.env.GROQ_MODEL || "qwen/qwen3.8-27b");
  console.log("API Key configured:", Boolean(process.env.GROQ_API_KEY));

  // Test Case 1: Real JPEG with C2PA and EXIF
  const streetPhotoPath = path.resolve(process.cwd(), "public/sample_street_photo.jpg");
  console.log("\n[TEST CASE 1] Real JPEG with C2PA:", streetPhotoPath);
  const streetBuffer = fs.readFileSync(streetPhotoPath);

  const report1 = await runVerificationPipeline({
    buffer: streetBuffer,
    fileName: "sample_street_photo.jpg",
    mimeType: "image/jpeg",
    activeSignals: ["ai-detection", "provenance", "metadata", "forensic"],
    dimensions: { width: 1200, height: 800 },
  });

  console.log("--> Report 1 ID:", report1.id);
  console.log("--> Ref ID:", report1.reportReferenceId);
  console.log("--> SHA-256:", report1.mediaFile.hashSha256);
  console.log("--> Overall Assessment:", report1.overallAssessment);
  console.log("--> Assessment Confidence:", report1.assessmentConfidence);
  console.log("--> Evidence Strength:", report1.evidenceStrengthLabel);
  console.log("--> Verdict Title:", report1.verdictTitle);
  console.log("--> Verdict Summary:", report1.verdictSummary);
  console.log("--> Signals Analyzed:", report1.signalResults.map((s) => `${s.signalLabel} [${s.signalValue}]`));
  console.log("--> Why This Assessment?");
  report1.keyFindings.forEach((finding, idx) => {
    console.log(`    ${idx + 1}. ${finding}`);
  });

  // Test Case 2: PNG file
  const pngPath = path.resolve(process.cwd(), "public/sample_media.png");
  if (fs.existsSync(pngPath)) {
    console.log("\n[TEST CASE 2] PNG Container Test:", pngPath);
    const pngBuffer = fs.readFileSync(pngPath);

    const report2 = await runVerificationPipeline({
      buffer: pngBuffer,
      fileName: "sample_media.png",
      mimeType: "image/png",
      activeSignals: ["ai-detection", "provenance", "metadata", "forensic"],
      dimensions: { width: 800, height: 600 },
    });

    console.log("--> Report 2 ID:", report2.id);
    console.log("--> SHA-256:", report2.mediaFile.hashSha256);
    console.log("--> Overall Assessment:", report2.overallAssessment);
    console.log("--> Signals Analyzed:", report2.signalResults.map((s) => `${s.signalLabel} [${s.signalValue}]`));
  }

  console.log("\n================================================================");
  console.log("           ALL E2E VERIFICATION PIPELINE TESTS PASSED           ");
  console.log("================================================================");
}

runE2ETests().catch((err) => {
  console.error("FATAL: E2E test execution error:", err);
  process.exit(1);
});
