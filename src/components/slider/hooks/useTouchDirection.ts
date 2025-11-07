import { useRef, useCallback } from "react";
import { TouchDirectionDetector } from "../touchDetection";

export const useTouchDirection = () => {
    const detectorRef = useRef(new TouchDirectionDetector());
    const isScrollingRef = useRef(false);

    const handleTouchStart = useCallback((e: React.TouchEvent | TouchEvent) => {
        const touch = e.touches[0];
        detectorRef.current.start(touch.clientX, touch.clientY);
        isScrollingRef.current = false;
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent | TouchEvent) => {
        const touch = e.touches[0];
        const direction = detectorRef.current.move(touch.clientX, touch.clientY);

        // If direction is determined and it's vertical, allow normal scroll
        if (direction.isDetermined && direction.isVertical) {
            isScrollingRef.current = true;
            return false; // Allow default vertical scroll
        }

        // If direction is horizontal, prevent scroll and allow slider drag
        if (direction.isDetermined && direction.isHorizontal) {
            isScrollingRef.current = false;
            return true; // Prevent default to allow slider drag
        }

        return false;
    }, []);

    const handleTouchEnd = useCallback(() => {
        detectorRef.current.reset();
        isScrollingRef.current = false;
    }, []);

    const isScrolling = useCallback(() => {
        return isScrollingRef.current;
    }, []);

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        isScrolling,
    };
};