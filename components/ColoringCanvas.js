import { useRef, useEffect, useState } from "react";
import { animalDrawings } from "../data/animalDrawings";

export default function ColoringCanvas({ color, size }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [currentAnimal, setCurrentAnimal] = useState(null);

  // 動物の線画を描画する関数
  const drawAnimal = (ctx, animal) => {
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 2;
    animal.paths.forEach(path => {
      ctx.beginPath();
      const pathObj = new Path2D(path);
      ctx.stroke(pathObj);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // キャンバスをクリア
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ランダムな動物を選択
    const randomAnimal = animalDrawings[Math.floor(Math.random() * animalDrawings.length)];
    setCurrentAnimal(randomAnimal);

    // 動物の線画を描画
    drawAnimal(ctx, randomAnimal);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const newAnimal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // キャンバスをクリア
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 新しいランダムな動物を選択
    const randomAnimal = animalDrawings[Math.floor(Math.random() * animalDrawings.length)];
    setCurrentAnimal(randomAnimal);

    // 動物の線画を描画
    drawAnimal(ctx, randomAnimal);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // キャンバスをクリア
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 現在の動物を再描画
    if (currentAnimal) {
      drawAnimal(ctx, currentAnimal);
    }
  };

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        width="500"
        height="400"
        style={{ border: "1px solid #000" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
      <div className="canvas-controls">
        <p className="animal-name">{currentAnimal ? `${currentAnimal.name}に色を塗ろう！` : ''}</p>
        <div className="canvas-buttons">
          <button onClick={clearCanvas} className="clear-button">
            クリア
          </button>
          <button onClick={newAnimal} className="new-animal-button">
            別の動物に変える
          </button>
        </div>
      </div>
    </div>
  );
}
