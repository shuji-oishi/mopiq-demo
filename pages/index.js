import { useState } from "react";
import ColoringCanvas from "../components/ColoringCanvas";
import ChatBox from "../components/ChatBox";

export default function Home() {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(10);

  return (
    <div className="app-container">
      <header>
        <h1>mopiQ</h1>
        <p>塗り絵を楽しみながらAIと会話しよう！</p>
      </header>

      <main>
        <section className="coloring-section">
          <h2>塗り絵エリア</h2>
          <div className="tools">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            <input type="range" min="1" max="50" value={size} onChange={(e) => setSize(e.target.value)} />
          </div>
          <ColoringCanvas color={color} size={size} />
        </section>
        <ChatBox />
      </main>
    </div>
  );
}
