import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { authorizeApi, handleAuthError } from "@/lib/auth/guards";
import { ROLES } from "@/lib/auth/roles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATE_FILE = path.join(process.cwd(), ".homepage_carousel_state.json");

function readSlides() {
  try {
    const data = fs.readFileSync(STATE_FILE, "utf-8");
    const slides = JSON.parse(data);
    return Array.isArray(slides) ? slides : [];
  } catch {
    return [];
  }
}

function writeSlides(slides) {
  const temporary = `${STATE_FILE}.tmp`;
  const serialized = JSON.stringify(slides, null, 2);
  try {
    fs.writeFileSync(temporary, serialized, "utf-8");
    fs.renameSync(temporary, STATE_FILE);
  } catch (error) {
    // A direct write is a reliable fallback on Windows when an antivirus or
    // preview process temporarily holds the old state file open.
    try { fs.unlinkSync(temporary); } catch {}
    fs.writeFileSync(STATE_FILE, serialized, "utf-8");
  }
}

export async function GET() {
  return NextResponse.json({ success: true, slides: readSlides() });
}

export async function PUT(request) {
  try {
    await authorizeApi([ROLES.ADMIN], request);
    const body = await request.json();
    const slides = Array.isArray(body.slides) ? body.slides : [];
    const sanitized = slides
      .filter((slide) => slide && typeof slide.image === "string" && slide.image.length > 0)
      .slice(0, 4)
      .map((slide) => ({
        id: String(slide.id || `hero-${Date.now()}`),
        image: String(slide.image),
        subtitle: String(slide.subtitle || "Featured service").slice(0, 100),
        title: String(slide.title || "Professional doorstep service").slice(0, 150),
        description: String(slide.description || "").slice(0, 500),
        buttonText: String(slide.buttonText || "Explore services").slice(0, 60),
        active: slide.active !== false,
      }));
    writeSlides(sanitized);
    return NextResponse.json({ success: true, slides: sanitized });
  } catch (error) {
    console.error("Homepage carousel update failed:", error);
    return handleAuthError(error);
  }
}
