"use client";

import { useEffect, useRef, useState } from "react";

interface UseCounterAnimationOptions {
  duration?: number;
  initialCount?: number;
}

/**
 * A React hook that animates a counter from an initial value to a target number.
 *
 * @param {number} targetNumber - The number to count up to.
 * @param {UseCounterAnimationOptions} [options] - Optional configuration for the animation.
 * @returns {number} The current animated count.
 */

const useCounterAnimation = (
  targetNumber: number,
  options?: UseCounterAnimationOptions
): number => {
  // Destructure options with default values
  const { duration = 2000, initialCount = 0 } = options || {};

  // State to hold the current count value during animation
  const [currentCount, setCurrentCount] = useState<number>(initialCount);

  // Ref to store the animation frame ID, allowing us to cancel it
  const animationFrameRef = useRef<number>(0);

  // Ref to store the start time of the animation for consistent calculations
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    // Function to start the animation
    const startAnimation = () => {
      setCurrentCount(initialCount); // Reset count when starting a new animation
      startTimeRef.current = performance.now(); // Record the start time
      animationFrameRef.current = requestAnimationFrame(animate); // Start the animation loop
    };

    // The animation loop function
    const animate = (currentTime: DOMHighResTimeStamp) => {
      // Calculate elapsed time since the animation started
      const elapsedTime = currentTime - startTimeRef.current;

      // Calculate the progress of the animation (0 to 1)
      const progress = Math.min(elapsedTime / duration, 1); // Clamp progress between 0 and 1

      // Calculate the new count based on progress.
      // We use linear interpolation: initialCount + progress * (targetNumber - initialCount)
      const newCount = initialCount + progress * (targetNumber - initialCount);

      // Update the state with the new count.
      // We use Math.floor for integer counts, or remove it for decimal counts.
      setCurrentCount(Math.floor(newCount));

      // If animation is not complete, request next frame
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation finished, ensure final count is exactly the target number
        setCurrentCount(targetNumber);
      }
    };

    // Start the animation when targetNumber or duration changes
    startAnimation();

    // Cleanup function: cancel any ongoing animation frame when component unmounts
    // or when dependencies (targetNumber, duration) change, triggering a re-run.
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [targetNumber, duration, initialCount]); // Dependencies for useEffect

  // Return the current animated count
  return currentCount;
};

export default useCounterAnimation;
