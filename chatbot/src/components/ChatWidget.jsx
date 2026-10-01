import { useState } from "react";
import Chatbot from "./Chatbot";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="chat-widget">
      <div className={`chat-pop ${open ? "show" : ""}`}>
        <Chatbot />
      </div>
      <button
        className="chat-fab"
        onClick={() => setOpen(!open)}
        aria-label="Chat"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
