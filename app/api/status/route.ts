import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// We store the status in a simple JSON file on the server
const DB_PATH = path.join(process.cwd(), "homepage-config.json");

function getStatus() {
  try {
    if (!fs.existsSync(DB_PATH)) return false;
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data).isDropActive;
  } catch (e) {
    return false;
  }
}

function setStatus(isActive: boolean) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ isDropActive: isActive }));
}

export async function GET() {
  // Prevent caching so every user gets the latest status instantly
  const isDropActive = getStatus();
  return NextResponse.json(
    { isDropActive },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function POST(req: Request) {
  const body = await req.json();
  setStatus(body.isDropActive);
  return NextResponse.json({ success: true });
}