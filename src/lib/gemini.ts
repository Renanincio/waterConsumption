import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function ImageReader(img_url: string) {
  let apiKey: string;
  if (process.env.API_KEY) {
    apiKey = process.env.API_KEY;
  } else {
    throw new Error("API_KEY environment variable is not set");
  }

  const fileManager = new GoogleAIFileManager(apiKey);

  const imageUrl = atob(img_url);

  const uploadResponse = await fileManager.uploadFile(imageUrl, {
    mimeType: "image/jpeg",
    displayName: "Jetpack drawing",
  });

  console.log(
    `Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`,
  );

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });

  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    {
      text: "read the image calculate the meter consumption value and return only in numbers",
    },
  ]);

  console.log(result.response.text());

  const resultConsumption = result.response.text();

  return parseFloat(resultConsumption);
}
