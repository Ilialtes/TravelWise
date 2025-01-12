import { Client } from "@gradio/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ message: "Message is required" }, { status: 400 });
    }

    const client = await Client.connect("Ilialtes/test");

    const result = await client.predict("/chat", {
      message,
      system_message: "You are a friendly Chatbot.",
      max_tokens: 500,
      temperature: 0.7,
      top_p: 0.9,
    });

    return NextResponse.json({ response: result.data }, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
