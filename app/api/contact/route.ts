import { NextResponse } from "next/server";

const ALLOWED_TOPICS = new Set(["choosing-a-trip", "existing-booking", "general-question", "partnership"]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function GET() {
  return NextResponse.json(
    { configured: Boolean(process.env.CONTACT_FORM_ENDPOINT) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { accepted: false, code: "delivery_unconfigured" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ accepted: false, code: "payload_too_large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ accepted: false, code: "invalid_json" }, { status: 400 });
  }

  const payload = {
    topic: clean(body.topic, 64),
    name: clean(body.name, 120),
    email: clean(body.email, 254),
    trip: clean(body.trip, 120),
    bookingReference: clean(body.bookingReference, 120),
    message: clean(body.message, 5000),
  };

  if (!ALLOWED_TOPICS.has(payload.topic) || !payload.name || !emailPattern.test(payload.email) || !payload.message) {
    return NextResponse.json({ accepted: false, code: "validation_failed" }, { status: 400 });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.CONTACT_FORM_AUTH_TOKEN) {
    headers.Authorization = `Bearer ${process.env.CONTACT_FORM_AUTH_TOKEN}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        source: "travelnliv.com/contact",
        submittedAt: new Date().toISOString(),
        ...payload,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return NextResponse.json({ accepted: false, code: "delivery_failed" }, { status: 502 });
    }

    return NextResponse.json(
      { accepted: true },
      { status: 202, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ accepted: false, code: "delivery_failed" }, { status: 502 });
  }
}
