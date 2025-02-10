import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { text: "こんにちは！塗り絵を楽しんでいますか？", sender: "ai" },
  ]);

  const sendMessage = async () => {
    const input = document.getElementById("userInput");
    const message = input.value;
    if (!message) return;
    
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    input.value = "";

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setMessages((prev) => [...prev, { text: data.reply, sender: "ai" }]);
  };

  return (
    <section className="chat-section">
      <h2>もぴっく君</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "ai" ? "ai-message" : "user-message"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input type="text" id="userInput" placeholder="メッセージを入力..." />
        <button onClick={sendMessage}>送信</button>
      </div>
    </section>
  );
}
