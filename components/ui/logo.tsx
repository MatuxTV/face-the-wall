'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface AnimatedLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function AnimatedLogo({ 
  width = 120, 
  height = 120, 
  className = "" 
}: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ width: width, height: height }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        filter: "drop-shadow(0 0 20px #FF4500)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeInOut",
        rotate: { duration: 0.8, repeat: Infinity, repeatType: "reverse" }
      }}
    >
      {/* Face Logo - Default state */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1, rotateX: 0, z: 0 }}
        animate={{
          opacity: isHovered ? 0 : 1,
          rotateX: isHovered ? 90 : 0,
          z: isHovered ? -50 : 0,
          scale: isHovered ? 0.8 : 1,
        }}
        transition={{ 
          duration: 0.6, 
          ease: "easeInOut",
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={{
            filter: isHovered ? "blur(2px)" : "blur(0px)",
          }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/logo-default.png"
            alt="Face The Wall Logo"
            width={width}
            height={height}
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Regular Logo - Hover state */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, rotateX: -90, z: -50 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          rotateX: isHovered ? 0 : -90,
          z: isHovered ? 0 : -50,
          scale: isHovered ? 1.05 : 0.8,
        }}
        transition={{ 
          duration: 0.6, 
          ease: "easeInOut",
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: isHovered ? 0.2 : 0
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={{
            filter: isHovered ? "drop-shadow(0 0 15px #FF4500)" : "drop-shadow(0 0 0px #FF4500)",
            scale: isHovered ? [1, 1.05, 1] : 1,
          }}
          transition={{ 
            duration: 0.4,
            scale: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          <Image
            src="/logo.png"
            alt="Face The Wall Logo Hover"
            width={width}
            height={height}
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Particle Effects */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-500 rounded-full"
              initial={{ 
                opacity: 0, 
                x: width / 2, 
                y: height / 2,
                scale: 0
              }}
              animate={{ 
                opacity: [0, 1, 0], 
                x: width / 2 + (Math.cos(i * 60 * Math.PI / 180) * 40),
                y: height / 2 + (Math.sin(i * 60 * Math.PI / 180) * 40),
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}

      {/* Glowing Ring Effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-orange-500"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? [0, 0.6, 0] : 0,
          scale: isHovered ? [0.8, 1.3, 1.6] : 0.8,
        }}
        transition={{ 
          duration: 1.5, 
          repeat: isHovered ? Infinity : 0,
          ease: "easeOut"
        }}
      />
    </motion.div>
  );
}