import React, { useEffect, useState } from 'react';

const AmbientBackground = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const items = [];
    const emojis = ['🎈', '✨', '💖', '🌸', '🎂', '⭐', '💫', '🧁'];
    
    for (let i = 0; i < 22; i++) {
      items.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 20 + 18,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }
    setElements(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft gradient blur circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-purple-300/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-32 left-1/3 w-[32rem] h-[32rem] bg-amber-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />

      {/* Floating particles */}
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float-slow select-none transition-transform"
          style={{
            left: el.left,
            top: el.top,
            fontSize: `${el.size}px`,
            opacity: el.opacity,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.emoji}
        </div>
      ))}
    </div>
  );
};

export default AmbientBackground;
