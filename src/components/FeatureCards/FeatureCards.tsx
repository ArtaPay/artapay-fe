"use client";

import { FeatureCardEffect, FeatureCardItem } from './FeatureCardItem';
import { useScroll, useTransform } from "motion/react";
import React from "react";

export default function FeatureCards() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // "start end" = progress 0 ketika top container baru menyentuh bottom viewport
    // "start center" = progress 1 ketika top container mencapai 50% viewport (center)
    offset: ["start end", "start center"],
  });

  // Animation completes at 100% scroll progress (when section reaches 50% viewport)
  // pathLength selesai di progress 1.0 (tepat di 50% viewport)
  const pathLengthFirst = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Content opacity: fade in di akhir animasi (0.7 to 1.0)
  const contentOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  const pathLengthSecond = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const features: FeatureCardItem[] = [
    {
      title: "Gasless Transactions",
      description: "Pay gas fees directly with stablecoins. No ETH required.",
    },
    {
      title: "Auto-Swap Engine",
      description: "Pay with any token you hold, settle in the token merchants need automatically.",
    },
    {
      title: "QR Payment",
      description: "Fast and convenient payment between users.",
    },
  ];

  return (
    // Container untuk scroll tracking
    // Height cukup untuk memberikan ruang scroll selama animasi
    <div
      className="min-h-[120vh] bg-black w-full relative"
      ref={ref}
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      <FeatureCardEffect
        items={features}
        contentOpacity={contentOpacity}
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}