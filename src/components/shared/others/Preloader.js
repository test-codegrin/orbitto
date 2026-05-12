"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TOTAL_DURATION = 1200;
const MOVE_DURATION = 800;
const HOLD_DURATION = TOTAL_DURATION - MOVE_DURATION;

const Preloader = () => {
  const brandRef = useRef(null);
  const [isMoving, setIsMoving] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [motion, setMotion] = useState({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    const startMoveTimer = setTimeout(() => {
      const brand = brandRef.current;
      const target = document.querySelector(
        ".ltn__header-area .header-logo-column .orbot-logo"
      );

      if (brand && target) {
        const sourceRect = brand.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const sourceCenterX = sourceRect.left + sourceRect.width / 2;
        const sourceCenterY = sourceRect.top + sourceRect.height / 2;
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        const scale = targetRect.width / sourceRect.width || 1;

        setMotion({
          x: targetCenterX - sourceCenterX,
          y: targetCenterY - sourceCenterY,
          scale,
        });
      } else {
        // Fallback: slide left if the header logo is not measurable yet.
        setMotion({
          x: -window.innerWidth * 0.34,
          y: -window.innerHeight * 0.38,
          scale: 1,
        });
      }

      setIsMoving(true);
    }, HOLD_DURATION);

    const hideTimer = setTimeout(() => {
      setIsHidden(true);
    }, TOTAL_DURATION + 50);

    return () => {
      clearTimeout(startMoveTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (isHidden) {
    return null;
  }

  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-inner">
        <div className="preloader-stage">
          <div
            className={`preloader-brand ${isMoving ? "preloader-brand--moving" : ""}`}
            style={
              isMoving
                ? {
                    "--preloader-move-duration": `${MOVE_DURATION}ms`,
                    transform: `translate(${motion.x}px, ${motion.y}px) scale(${motion.scale})`,
                  }
                : {
                    "--preloader-move-duration": `${MOVE_DURATION}ms`,
                  }
            }
          >
            <Image
              ref={brandRef}
              className="preloader-logo-img"
              src="/img/logo.png"
              alt="Loading"
              width={154}
              height={42}
              priority
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Preloader;
