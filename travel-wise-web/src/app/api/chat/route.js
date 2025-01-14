import { Client } from "@gradio/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt } = body;

    console.log("Received request body:", body);

    if (!prompt || prompt.trim() === "") {
      console.warn("No prompt provided in request body.");
      return NextResponse.json({ message: "Prompt is required" }, { status: 400 });
    }

    console.log(prompt);
    console.log("Connecting to Gradio Space...");
    const client = await Client.connect("Ilialtes/test");
    console.log("Connected to Gradio Space.");

    console.log("Sending data to Gradio Space...");
    const result = await client.predict("/predict", {
      prompt: prompt.trim(),
    });

    console.log("Received response from Gradio Space:", result);

    if (result?.data?.[0]) {
      const response = result.data[0];
      const sanitizedResponse = response.replace(prompt.trim(), "").trim();

      return NextResponse.json({ response: sanitizedResponse }, { status: 200 });
    } else {
      console.error("Unexpected result structure:", result);
      return NextResponse.json(
        { message: "Unexpected result structure from Gradio Space." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in API route:", error);

    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
