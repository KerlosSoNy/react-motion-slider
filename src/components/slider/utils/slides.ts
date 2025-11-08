import React from "react";

export const getClonedSlides = (
    children: React.ReactNode[] | React.ReactNode,
    loop: boolean,
    adjustedSlidesToShow: number,
): React.ReactNode[] => {
    // IMPORTANT: Convert to array to handle single child
    const childrenArray = React.Children.toArray(children);
    
    if (!loop || childrenArray.length === 0) {
        return childrenArray;
    }

    const slides: React.ReactNode[] = [];
    const clonesCount = Math.max(adjustedSlidesToShow * 2, childrenArray.length);

    // Clone start
    for (let i = 0; i < clonesCount; i++) {
        const childIndex = (childrenArray.length - (clonesCount - i)) % childrenArray.length;
        const child = childrenArray[childIndex];
        if (child && React.isValidElement(child)) {
            slides.push(
                React.cloneElement(child, {
                    key: `clone-start-${i}`,
                } as any)
            );
        }
    }

    // Original slides
    childrenArray.forEach((child, index) => {
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
        const child = childrenArray[i % childrenArray.length];
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