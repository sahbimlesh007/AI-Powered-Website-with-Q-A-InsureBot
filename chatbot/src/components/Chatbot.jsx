import { useState, useRef, useEffect } from "react";
import { company, products, suggestedQuestions } from "../data/companyData";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");
const BACKEND_URL = `${API_URL}/chat`;

// Simple keyword fallback if the backend is down
function localAnswer(q) {
  const t = q.toLowerCase();
  if (/(incorporat|founded|started|established|when)/.test(t))
    return `${company.name} was incorporated on ${company.incorporated}.`;
  if (/(product|offer|service|insurance type|cover)/.test(t))
    return "We offer: " + products.map((p) => p.name).join(", ") + ".";
  if (/(where|address|location|office)/.test(t))
    return `Our registered office: ${company.address}.`;
  if (/(partner|owner|director|founder)/.test(t))
    return `The designated partner is ${company.designatedPartner}.`;
  if (/(llpin|registration|roc|status)/.test(t))
    return `LLPIN: ${company.llpin}, registered with ${company.roc}. Status: ${company.status}.`;
  if (/(employee|team|size|staff)/.test(t))
    return `The team size is around ${company.employees} employees.`;
  if (/(value|trust|mission|about|who)/.test(t))
    return `${company.description} Our values: ${company.values.join(", ")}.`;
  return "Sorry, I don't have that detail. Try asking about our products, location, incorporation date or team.";
}

async function backendAnswer(history) {
  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history }),
  });
  if (!res.ok) throw new Error(`Backend error ${res.status}`);
  const data = await res.json();
  return data.reply;
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! Ask me anything about ${company.name}.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const question = (text ?? input).trim();
    if (!question || loading) return;

    const updated = [...messages, { role: "user", content: question }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    let reply;
    try {
      // skip the greeting message when sending history
      reply = await backendAnswer(updated.slice(1));
    } catch (err) {
      console.error(err);
      reply = localAnswer(question);
    }
    setMessages([...updated, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  return (
    <div className="chatbot">
      <div className="chat-header">Ask Devansh Assistant</div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.content}
          </div>
        ))}
        {loading && <div className="msg assistant">Typing...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="chips">
        {suggestedQuestions.map((q) => (
          <button key={q} className="chip" onClick={() => send(q)}>
            {q}
          </button>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type your question..."
        />
        <button onClick={() => send()}>Send</button>
      </div>
    </div>
  );
}
