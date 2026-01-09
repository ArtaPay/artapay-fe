"use client";
import { cn } from "@/lib/utils";
import { motion, MotionValue } from "motion/react";

const transition = {
  duration: 0,
  ease: "linear" as const,
};

// Glowing border animation variants
const glowVariants = {
  initial: {
    filter: "drop-shadow(0 0 0px #D89B00)",
  },
  hover: {
    filter: "drop-shadow(0 0 20px #D89B00) drop-shadow(0 0 40px #D89B00) drop-shadow(0 0 60px #D89B00)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export interface FeatureCardItem {
  title: string;
  description: string;
}

export const FeatureCardEffect = ({
  pathLengths,
  contentOpacity,
  items,
  className,
}: {
  pathLengths: MotionValue[];
  contentOpacity: MotionValue;
  items: FeatureCardItem[];
  className?: string;
}) => {
  return (
    // Sticky container dengan vertical centering
    <div
      className={cn(
        "sticky top-0 min-h-screen w-full flex items-center justify-center py-8 md:py-20 px-4",
        className
      )}
    >
      {/* Cards Container - Grid: 2 cols on mobile (2+1 layout), 3 cols on desktop */}
      <div className="grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-8 items-stretch justify-center max-w-lg md:max-w-none">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial="initial"
            whileHover="hover"
            className={cn(
              "relative w-full md:w-[240px] h-[180px] md:h-[320px] flex flex-col items-start justify-center px-3 md:px-6 gap-1 md:gap-4 cursor-pointer",
              // Third card spans full width on mobile and is centered
              index === 2 && "col-span-2 mx-auto max-w-[50%] md:max-w-none"
            )}
          >
            {/* Content - Animated opacity */}
            <motion.div
              className="relative z-10 flex flex-col items-start gap-1 md:gap-4"
              style={{ opacity: contentOpacity }}
            >
              <h3
                className="font-hero text-sm md:text-xl lg:text-2xl text-white leading-tight"
                style={{ fontVariant: 'small-caps' }}
              >
                {item.title}
              </h3>
              <p className="font-sans text-[9px] md:text-sm text-[#C9A227] italic leading-relaxed">
                {item.description}
              </p>
            </motion.div>

            {/* SVG Border with glow effect on hover */}
            <motion.svg
              variants={glowVariants}
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 240 320"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.rect
                x="0"
                y="0"
                width="240"
                height="320"
                rx="16"
                ry="16"
                stroke="#C9A227"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                style={{ pathLength: pathLengths[index] || pathLengths[0] }}
                transition={transition}
              />
            </motion.svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
};