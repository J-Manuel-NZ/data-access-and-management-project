import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename =  file.name.replaceAll(" ", "_");
  const filepath = path.join(process.cwd(), "public/assets/" + filename)
  const fileUrl = `/assets/${filename}`;
  console.log(filename);
  try {
    await writeFile(filepath, buffer);
    return NextResponse.json({ Message: "Success", fileUrl,  status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
