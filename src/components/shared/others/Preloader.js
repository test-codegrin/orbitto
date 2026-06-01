"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TOTAL_DURATION = 1200;
const MOVE_DURATION = 800;
const HOLD_DURATION = TOTAL_DURATION - MOVE_DURATION;
const EDGE_PADDING = 20;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const isRectVisible = (rect) =>
  rect.width > 0 &&
  rect.height > 0 &&
  rect.bottom > 0 &&
  rect.right > 0 &&
  rect.top < window.innerHeight &&
  rect.left < window.innerWidth;

const getBestLogoTarget = () => {
  const logoNodes = Array.from(
    document.querySelectorAll(".ltn__header-area .orbot-logo")
  );

  if (!logoNodes.length) return null;

  const stickyVisibleLogo = logoNodes.find((logoNode) => {
    const rect = logoNode.getBoundingClientRect();
    return Boolean(logoNode.closest(".sticky-active")) && isRectVisible(rect);
  });

  if (stickyVisibleLogo) return stickyVisibleLogo;

  const visibleLogo = logoNodes.find((logoNode) =>
    isRectVisible(logoNode.getBoundingClientRect())
  );

  return visibleLogo || logoNodes[0];
};

const Preloader = () => {
  const brandRef = useRef(null);
  const [isMoving, setIsMoving] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [motion, setMotion] = useState({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    const startMoveTimer = setTimeout(() => {
      const brand = brandRef.current;
      window.dispatchEvent(new Event("scroll"));
      const target = getBestLogoTarget();

      if (brand && target) {
        const sourceRect = brand.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const sourceCenterX = sourceRect.left + sourceRect.width / 2;
        const sourceCenterY = sourceRect.top + sourceRect.height / 2;
        const rawTargetCenterX = targetRect.left + targetRect.width / 2;
        const rawTargetCenterY = targetRect.top + targetRect.height / 2;
        const targetCenterX = isRectVisible(targetRect)
          ? rawTargetCenterX
          : clamp(
              rawTargetCenterX,
              sourceRect.width / 2 + EDGE_PADDING,
              window.innerWidth - sourceRect.width / 2 - EDGE_PADDING
            );
        const targetCenterY = isRectVisible(targetRect)
          ? rawTargetCenterY
          : clamp(
              rawTargetCenterY,
              sourceRect.height / 2 + EDGE_PADDING,
              window.innerHeight - sourceRect.height / 2 - EDGE_PADDING
            );
        const scale =
          sourceRect.width > 0 && targetRect.width > 0
            ? targetRect.width / sourceRect.width
            : 1;

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
              src="/img/logo.webp"
              alt="Loading"
              width={254}
              height={254}
              priority
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Preloader;
