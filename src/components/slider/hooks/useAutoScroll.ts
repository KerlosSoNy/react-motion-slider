import { useState, useEffect, useRef } from "react";

interface UseAutoScrollProps {
    autoScroll: boolean;
    autoScrollInterval: number;
    autoScrollDirection: "next" | "prev";
    pauseOnHover: boolean;
    pauseOnFocus: boolean;
    isHovered: boolean;
    isFocused: boolean;
    handleNext: () => void;
    handlePrev: () => void;
    currentIndex: number;
    maxIndex: number;
    loop: boolean;
    direction: "ltr" | "rtl"; 
}

export const useAutoScroll = ({
    autoScroll,
    autoScrollInterval,
    autoScrollDirection,
    pauseOnHover,
    pauseOnFocus,
    isHovered,
    isFocused,
    handleNext,
    handlePrev,
    currentIndex,
    maxIndex,
    loop,
    direction,
}: UseAutoScrollProps) => {
    const [isAutoScrolling, setIsAutoScrolling] = useState(autoScroll);
    const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const startAutoScroll = () => {
        setIsAutoScrolling(true);
    };

    const stopAutoScroll = () => {
        setIsAutoScrolling(false);
    };

    const toggleAutoScroll = () => {
        setIsAutoScrolling((prev) => !prev);
    };

    // Autoscroll logic
    useEffect(() => {
        if (!isAutoScrolling) {
            if (autoScrollTimeoutRef.current) {
                clearTimeout(autoScrollTimeoutRef.current);
                autoScrollTimeoutRef.current = null;
            }
            return;
        }

        // Don't autoscroll if paused by hover/focus
        const shouldPause =
            (pauseOnHover && isHovered) || (pauseOnFocus && isFocused);
        if (shouldPause) return;

const scroll = () => {
    // RTL FIX: Reverse direction for RTL mode
    const shouldReverse = direction === "rtl";
    
    if (autoScrollDirection === "next") {
        shouldReverse ? handlePrev() : handleNext();
    } else {
        shouldReverse ? handleNext() : handlePrev();
    }
};

        autoScrollTimeoutRef.current = setTimeout(scroll, autoScrollInterval);

        return () => {
            if (autoScrollTimeoutRef.current) {
                clearTimeout(autoScrollTimeoutRef.current);
            }
        };
    }, [
        isAutoScrolling,
        autoScrollDirection,
        autoScrollInterval,
        pauseOnHover,
        pauseOnFocus,
        isHovered,
        isFocused,
        currentIndex,
        maxIndex,
        loop,
        direction,
        handleNext,
        handlePrev,
    ]);

    // Initialize autoscroll
    useEffect(() => {
        setIsAutoScrolling(autoScroll);
    }, [autoScroll]);

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            if (autoScrollTimeoutRef.current) {
                clearTimeout(autoScrollTimeoutRef.current);
            }
        };
    }, []);

    return {
        isAutoScrolling,
        startAutoScroll,
        stopAutoScroll,
        toggleAutoScroll,
    };
};