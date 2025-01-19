import { writeFile, createWriteStream } from "fs";
import { NextResponse } from "next/server";
import Replicate, { FileOutput } from "replicate";

// Initialize Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, // Ensure you set this in your environment variables
});

// Prevent Next.js / Vercel from caching responses
// See https://github.com/replicate/replicate-javascript/issues/136#issuecomment-1728053102
replicate.fetch = (url, options) => {
  return fetch(url, { cache: "no-store", ...options });
};

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req: Request) {
  const { garm_img, human_img, garment_des } = await req.json();

  if (
    !garm_img ||
    !human_img ||
    typeof garm_img != "string" ||
    typeof human_img != "string"
  ) {
    console.log(garm_img, human_img);
    return NextResponse.json(
      {
        error: "Both garm_img and human_img are required",
      },
      { status: 400, headers },
    );
  }

  console.log("Received Request Body:");
  console.log(garm_img);
  console.log(human_img);
  console.log(garment_des);

  // Prepare input for Replicate
  const input: { garm_img: string; human_img: string; garment_des: string } = {
    garm_img: garm_img,
    human_img: human_img,
    garment_des: garment_des || "",
  };

  // Run the Replicate model
  const output = await replicate.run(
    "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
    { input },
  );

  const data = output as FileOutput;
  const dataURL = data.url();
  console.log(dataURL);

  const blob = await data.blob();
  const arrayBuffer = await blob.arrayBuffer();

  await writeFile("output/output.jpg", Buffer.from(arrayBuffer), (err) => {
    throw err;
  });

  return NextResponse.json(
    {
      message: "Image processed successfully",
      dataURL,
    },
    {
      status: 200,
      headers,
    },
  );
}
