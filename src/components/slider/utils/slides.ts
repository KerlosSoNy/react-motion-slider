import React from "react";

export const getClonedSlides = (
    children: React.ReactNode[],
    loop: boolean,
    adjustedSlidesToShow: number,
    totalSlides: number
): React.ReactNode[] => {
    if (!loop || totalSlides === 0) return children;

    const slides: React.ReactNode[] = [];
    const clonesCount = Math.max(adjustedSlidesToShow * 2, totalSlides);

    // Clone start
    for (let i = 0; i < clonesCount; i++) {
        const child = children[(totalSlides - (clonesCount - i)) % totalSlides];
        if (child && React.isValidElement(child)) {
            slides.push(
                React.cloneElement(child, {
                    key: `clone-start-${i}`,
                } as any)
            );
        }
    }

    // Original slides
    children.forEach((child, index) => {
        if (child && React.isValidElement(child)) {
            slides.push(
                React.cloneElement(child, {
                    key: `original-${index}`,
                } as any)
            );
        }
    });

    // Clone end
    for (let i = 0; i < clonesCount; i++) {
        const child = children[i % totalSlides];
        if (child && React.isValidElement(child)) {
            slides.push(
                React.cloneElement(child, {
                    key: `clone-end-${i}`,
                } as any)
            );
        }
    }

    return slides;
};

export const getCloneCount = (
    loop: boolean,
    adjustedSlidesToShow: number,
    totalSlides: number
): number => {
    return loop ? Math.max(adjustedSlidesToShow * 2, totalSlides) : 0;
};