"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
export function FloatingIcon({ count = 5 }) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    setPositions(
      Array.from({ length: count }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }))
    );

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [count]);

  return (
    <div className="relative w-full h-full">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ x: pos.x, y: pos.y, opacity: 0.8 }}
          animate={{
            x: [
              pos.x,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              pos.y,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
            rotate: [0, 180, 360],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div
            className="relative w-8 h-8 bg-white/10 backdrop-blur-md 
            rounded-full border border-white/10 flex items-center justify-center 
            transform hover:scale-110 transition-transform shadow-lg shadow-purple-500/50 dark:shadow-blue-500/50"
          >
            <Image
              src="/Logo/mars.png"
              alt="Mars"
              width={32}
              height={32}
              className="w-8 h-8 object-cover"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
