import React from "react";

export interface BreakpointConfig {
    slidesPerView: number;
    spaceBetween: number;
}

export interface Breakpoints {
    [key: number]: BreakpointConfig;
}

export interface CoverflowOptions {
    rotate?: number;
    stretch?: number;
    depth?: number;
    modifier?: number;
    slideShadows?: boolean;
    centerSlideWidth?: number;
}

export interface SliderProps {
    slidesToShow: number;
    children: React.ReactNode[] | React.ReactNode;
    direction?: "ltr" | "rtl";
    loop?: boolean;
    language?: string;
    onSlideChange?: (index: number) => void;
    onSlideNext?: (currentIndex: number, nextIndex: number) => void;
    onSlidePrev?: (currentIndex: number, prevIndex: number) => void;
    isCenter?: boolean;
    isHidden?: boolean;
    gap?: number;
    isRolled?: boolean;
    breakpoints?: Breakpoints;
    slideClassName?: string;
    slideStyle?: React.CSSProperties;
    getSlideClassName?: (index: number, isActive: boolean) => string;
    getSlideStyle?: (index: number, isActive: boolean) => React.CSSProperties;
    renderSlide?: (
        slide: React.ReactNode,
        index: number,
        isActive: boolean,
        realIndex: number
    ) => React.ReactNode;
    coverflow?: boolean;
    coverflowOptions?: CoverflowOptions;
    showDebug?: boolean;
    showButtons?: boolean;
    showDots?: boolean;
    autoScroll?: boolean;
    autoScrollInterval?: number;
    autoScrollDirection?: "next" | "prev";
    pauseOnHover?: boolean;
    pauseOnFocus?: boolean;
}

export interface SliderRef {
    next: () => void;
    prev: () => void;
    goTo: (index: number) => void;
    getCurrentIndex: () => number;
    getRealIndex: () => number;
    startAutoScroll: () => void;
    stopAutoScroll: () => void;
    toggleAutoScroll: () => void;
}

export interface SliderState {
    currentIndex: number;
    isAnimating: boolean;
    isDragging: boolean;
    currentSlidesToShow: number;
    currentGap: number;
    containerWidth: number;
    isAutoScrolling: boolean;
    isHovered: boolean;
    isFocused: boolean;
    skipAnimation: boolean;
}