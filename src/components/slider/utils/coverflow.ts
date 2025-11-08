import { CoverflowOptions } from "../types";

export const getCoverflowSlideWidth = (
    index: number,
    containerWidth: number,
    loop: boolean,
    cloneCount: number,
    totalSlides: number,
    realIndex: number,
    coverflowOptions: CoverflowOptions
): number => {
    if (!containerWidth) return 0;

    const realSlideIndex = loop
        ? (index - cloneCount + totalSlides) % totalSlides
        : index;
    const isActive = realIndex === realSlideIndex;

    const centerWidth = coverflowOptions.centerSlideWidth || 95;
    const sideWidth = (100 - centerWidth) / 2;

    if (isActive) {
        return (containerWidth * centerWidth) / 100;
    } else {
        return (containerWidth * sideWidth) / 100;
    }
};

export const getCoverflowStyle = (
    index: number,
    isActive: boolean,
    coverflow: boolean,
    loop: boolean,
    cloneCount: number,
    totalSlides: number,
    realIndex: number,
    coverflowOptions: Required<CoverflowOptions>
): React.CSSProperties => {
    if (!coverflow) return {};

    const { rotate, stretch, depth, modifier, slideShadows } = coverflowOptions;

    const realSlideIndex = loop
        ? (index - cloneCount + totalSlides) % totalSlides
        : index;
    const offset = realSlideIndex - realIndex;
    const absOffset = Math.abs(offset);

    if (absOffset > 1) {
        return {
            opacity: 0,
            visibility: "hidden" as const,
            pointerEvents: "none" as const,
        };
    }

    const rotateY = offset * rotate;
    const translateZ = -absOffset * depth * modifier;
    const translateX = offset * stretch;
    const scale = isActive ? 1 : 0.85;
    const opacity = isActive ? 1 : 0.6;
    const zIndex = isActive ? 10 : 5 - absOffset;

    return {
        transform: `perspective(1200px) rotateY(${rotateY}deg) translateZ(${translateZ}px) translateX(${translateX}px) scale(${scale})`,
        opacity,
        zIndex,
        boxShadow:
            slideShadows && !isActive
                ? "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
                : isActive && slideShadows
                    ? "0 20px 40px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
                    : "none",
        transformStyle: "preserve-3d",
        transition: "all 0.3s ease",
    };
};

export const getCoverflowClassName = (
    index: number,
    isActive: boolean,
    coverflow: boolean
): string => {
    if (!coverflow) return "";
    return `coverflow-slide ${isActive ? "coverflow-active" : "coverflow-inactive"}`;
};