"use client";

import React, { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error communicating with the API.");
      }

      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      console.error("Error during prediction:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I encountered an error. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      handleSend();
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-teal-50 p-4">
      <div className="bg-white shadow-md rounded p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-teal-800">Dashboard</h2>
        <div className="border border-teal-300 rounded p-4 h-96 overflow-y-auto bg-teal-100">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.sender === "bot" ? "text-left text-teal-800" : "text-right text-teal-600"
              }`}
            >
              <p
                className={`inline-block px-4 py-2 rounded ${
                  msg.sender === "bot" ? "bg-teal-200" : "bg-teal-300"
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Submit on Enter key press
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-teal-300 rounded-l focus:outline-none focus:ring-0 focus:border-teal-300 text-black"
            />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`px-4 py-2 bg-teal-600 text-white font-semibold rounded-r ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-700"
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </section>
  );
}
