"use client";
import { useState, useEffect, useRef } from "react";

// Define a type for each message in chat history
type ChatMessage = {
  sender: string;
  text: string;
};

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    // Add user's message to the chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: "User", text: message },
    ]);
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      if (typeof data.response === "string") {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { sender: "Eva", text: data.response },
        ]);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "Eva", text: "Sorry, something went wrong." },
      ]);
    }

    setMessage(""); // Clear input
    setIsLoading(false);
  };

  // Function to handle Enter key submission
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  return (
    <div className="chatbot p-4 rounded-lg border shadow-md max-w-md mx-auto mt-10 bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Eva Assistant</h2>

      {/* Chat History */}
      <div className="chat-history mb-4 overflow-y-auto max-h-80 p-4 bg-gray-100 rounded-lg">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex ${
              chat.sender === "Eva" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`p-3 rounded-lg mb-2 shadow ${
                chat.sender === "Eva"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-blue-500 text-white"
              } animate-slide-up`}
            >
              {chat.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start p-3 text-gray-500">
            Eva is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex items-center">
        <input
          type="text"
          className="border p-2 w-full rounded mr-2"
          placeholder="Ask me about health..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger send on Enter
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
