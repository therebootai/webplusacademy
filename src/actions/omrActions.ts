"use server";

import { ImageAnnotatorClient } from "@google-cloud/vision";

const credentialsJsonString = process.env.GOOGLE_APPLICATION_CREDENTIALS;

let credentials = {};
if (credentialsJsonString) {
  try {
    // Parse the JSON string into a JavaScript object
    credentials = JSON.parse(credentialsJsonString);
  } catch (e) {
    console.error("Failed to parse GOOGLE_APPLICATION_CREDENTIALS JSON:", e);
    // You might want to throw an error or handle fallback here
  }
} else {
  console.warn(
    "GOOGLE_APPLICATION_CREDENTIALS is not set. Client will rely on default authentication mechanisms."
  );
}

const visionClient = new ImageAnnotatorClient({
  credentials: credentials,
});

export async function SCAN_OMR(file: File) {
  try {
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const [result] = await visionClient.annotateImage({
      image: { content: base64Image },
      features: [{ type: "DOCUMENT_TEXT_DETECTION" }], // Use DOCUMENT_TEXT_DETECTION for bounding boxes
    });

    const fullTextAnnotation = result.fullTextAnnotation;

    console.log(fullTextAnnotation);

    return {
      success: true,
      data: fullTextAnnotation,
    };
  } catch (error) {
    console.error("OMR Grading Error:", error);
    return {
      success: false,
      message: `An error occurred during grading: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
