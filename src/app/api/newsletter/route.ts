import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const API_KEY = process.env.MAILERLITE_API_KEY;
    const GROUP_ID = process.env.MAILERLITE_GROUP_ID;

    if (!API_KEY) {
      console.error("MAILERLITE_API_KEY is not set");
      return NextResponse.json(
        { error: "Newsletter service is not configured." },
        { status: 500 }
      );
    }

    // MailerLite Classic API — add subscriber to a group (or general list)
    const url = GROUP_ID
      ? `https://api.mailerlite.com/api/v2/groups/${GROUP_ID}/subscribers`
      : `https://api.mailerlite.com/api/v2/subscribers`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": API_KEY,
      },
      body: JSON.stringify({
        email,
        resubscribe: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("MailerLite error:", response.status, errorData);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
