import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// cloudinary.config({
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// });

export async function POST(req: Request) {
  const body = (await req.json()) as { paramsToSign: Record<string, string> };

  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string
  );


  return NextResponse.json({ signature });
}
