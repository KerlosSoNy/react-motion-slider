import { useState, useEffect } from "react";

export const useSliderState = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [skipAnimation, setSkipAnimation] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return {
        currentIndex,
        setCurrentIndex,
        isAnimating,
        setIsAnimating,
        isDragging,
        setIsDragging,
        skipAnimation,
        setSkipAnimation,
        isHovered,
        setIsHovered,
        isFocused,
        setIsFocused,
    };
};

export const useLoopReset = (
    currentIndex: number,
    loop: boolean,
    totalSlides: number,
    setSkipAnimation: (value: boolean) => void,
    setIsAnimating: (value: boolean) => void,
    setCurrentIndex: (value: number) => void
) => {
    useEffect(() => {
        if (!loop) return;

        if (currentIndex >= totalSlides) {
            const timer = setTimeout(() => {
                setSkipAnimation(true);
                setIsAnimating(false);
                setCurrentIndex(0);
                requestAnimationFrame(() => {
                    setSkipAnimation(false);
                });
            }, 300);

            return () => clearTimeout(timer);
        } else if (currentIndex < 0) {
            const timer = setTimeout(() => {
                setSkipAnimation(true);
                setIsAnimating(false);
                setCurrentIndex(totalSlides - 1);
                requestAnimationFrame(() => {
                    setSkipAnimation(false);
                });
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, loop, totalSlides, setSkipAnimation, setIsAnimating, setCurrentIndex]);
};