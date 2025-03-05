import { useState, useEffect, useRef } from "react";
import { Coffee, Heart, StepBack } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VintageCafeGame = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameActive, setGameActive] = useState(false);
  const [items, setItems] = useState([]);
  const [playerPosition, setPlayerPosition] = useState(50);
  const gameAreaRef = useRef(null);

  // Café items with their point values
  const cafeItems = [
    { emoji: "☕", name: "Coffee", points: 10 },
    { emoji: "🥐", name: "Croissant", points: 15 },
    { emoji: "🧁", name: "Cupcake", points: 20 },
    { emoji: "🥪", name: "Sandwich", points: 25 },
    { emoji: "🍰", name: "Cake", points: 30 },
  ];

  useEffect(() => {
    if (!gameActive) return;

    const spawnItem = () => {
      const item = cafeItems[Math.floor(Math.random() * cafeItems.length)];
      const newItem = {
        id: Date.now(),
        ...item,
        x: Math.random() * 80 + 10,
        y: 0,
      };
      setItems((prev) => [...prev, newItem]);
    };

    const gameLoop = setInterval(() => {
      setItems((prevItems) =>
        prevItems
          .map((item) => ({
            ...item,
            y: item.y + 1.5,
          }))
          .filter((item) => {
            if (item.y > 95) {
              setLives((prev) => prev - 1);
              return false;
            }
            return true;
          }),
      );
    }, 50);

    const spawnInterval = setInterval(spawnItem, 2000);

    return () => {
      clearInterval(gameLoop);
      clearInterval(spawnInterval);
    };
  }, [gameActive]);

  useEffect(() => {
    if (lives <= 0) {
      setGameActive(false);
    }
  }, [lives]);

  const handleTouch = (e) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setPlayerPosition(Math.max(10, Math.min(90, x)));
  };

  const checkCollision = (item) => {
    const playerRange = { min: playerPosition - 12, max: playerPosition + 12 };
    if (
      item.y > 85 &&
      item.y < 95 &&
      item.x > playerRange.min &&
      item.x < playerRange.max
    ) {
      setScore((prev) => prev + item.points);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    items.forEach(checkCollision);
  }, [items, playerPosition]);

  const { toast } = useToast();

  return (
    <div className="mx-auto flex h-screen max-w-screen flex-col overflow-hidden bg-amber-50">
      {/* Vintage Header */}
      <div className="bg-amber-900/90 p-4 text-amber-100">
        <h1 className="mb-2 grid text-center font-serif text-3xl">
          <StepBack
            className="absolute top-4 size-7"
            onClick={() =>
              toast({
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
              })
            }
          />{" "}
          Chai Bucks
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5" />
            <span className="font-serif text-lg">{score}</span>
          </div>
          <div className="flex gap-1">
            {[...Array(lives)].map((_, i) => (
              <Heart
                key={i}
                className="h-5 w-5 text-red-400"
                fill="currentColor"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div
        ref={gameAreaRef}
        className="relative w-full grow basis-full bg-[url('/api/placeholder/400/320')] bg-cover bg-center"
        onTouchMove={handleTouch}
        onTouchStart={handleTouch}
      >
        {/* Vintage Overlay */}
        <div className="absolute inset-0 bg-amber-900/10 backdrop-sepia"></div>

        {!gameActive && (
          <div className="absolute -inset-4 isolate z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="rounded-lg bg-amber-900/90 p-8 text-center">
              <button
                onClick={() => {
                  setGameActive(true);
                  setScore(0);
                  setLives(3);
                  setItems([]);
                }}
                className="rounded-full bg-amber-600 px-8 py-4 font-serif text-xl text-amber-100 shadow-lg transition hover:bg-amber-700"
              >
                {lives <= 0 ? "Try Again" : "Start Service"}
              </button>
              {lives <= 0 && (
                <div className="mt-4 font-serif text-lg text-amber-100">
                  Points Collected: {score}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Falling Items */}
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute mt-6 text-3xl"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: "translate(-50%, -50%)",
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {item.emoji}
          </div>
        ))}

        {/* Player - Serving Tray */}
        <div
          className="absolute -bottom-1 text-4xl"
          style={{
            left: `${playerPosition}%`,
            transform: "translate(-50%, 0)",
          }}
        >
          😋
        </div>
      </div>
      <div className="h-4 bg-yellow-600"></div>

      {/* Instructions */}
      <div className="bg-amber-900/90 p-4 text-center font-serif text-amber-100">
        <p>Catch the falling café items with your serving tray!</p>
        <div className="mt-2 flex justify-center gap-4 text-sm">
          {cafeItems.map((item) => (
            <div key={item.name} className="flex items-center gap-1">
              <span>{item.emoji}</span>
              <span>{item.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VintageCafeGame;
