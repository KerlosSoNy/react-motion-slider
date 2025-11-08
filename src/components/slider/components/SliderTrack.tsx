import React, { useRef, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import SlideWrapper from "./SlideWrapper";
import { useTouchDirection } from "../hooks/useTouchDirection";

interface SliderTrackProps {
    displaySlides: React.ReactNode[];
    isDragging: boolean;
    isAnimating: boolean;
    skipAnimation: boolean;
    transformX: number | string;
    direction: "ltr" | "rtl";
    coverflow: boolean;
    responsiveGap: number;
    containerPadding: string;
    loop: boolean;
    cloneCount: number;
    totalSlides: number;
    realIndex: number;
    slideWidth: number | string;
    slideClassName: string;
    slideStyle: React.CSSProperties;
    getSlideClassName?: (index: number, isActive: boolean) => string;
    getSlideStyle?: (index: number, isActive: boolean) => React.CSSProperties;
    getCoverflowSlideWidth: (index: number) => number;
    getCoverflowStyle: (index: number, isActive: boolean) => React.CSSProperties;
    getCoverflowClassName: (index: number, isActive: boolean) => string;
    renderSlide?: (
        slide: React.ReactNode,
        index: number,
        isActive: boolean,
        realIndex: number
    ) => React.ReactNode;
    onDragStart: () => void;
    onDragEnd: (event: any, info: PanInfo) => void;
}

const SliderTrack: React.FC<SliderTrackProps> = ({
    displaySlides,
    isDragging,
    isAnimating,
    skipAnimation,
    transformX,
    direction,
    coverflow,
    responsiveGap,
    containerPadding,
    loop,
    cloneCount,
    totalSlides,
    realIndex,
    slideWidth,
    slideClassName,
    slideStyle,
    getSlideClassName,
    getSlideStyle,
    getCoverflowSlideWidth,
    getCoverflowStyle,
    getCoverflowClassName,
    renderSlide,
    onDragStart,
    onDragEnd,
}) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const { handleTouchStart, handleTouchMove, handleTouchEnd, isScrolling } =
        useTouchDirection();

    // Handle touch events
    useEffect(() => {
        const trackElement = trackRef.current;
        if (!trackElement) return;

        const onTouchStart = (e: TouchEvent) => {
            handleTouchStart(e);
        };

        const onTouchMove = (e: TouchEvent) => {
            const shouldPreventDefault = handleTouchMove(e);

            if (shouldPreventDefault && !isScrolling()) {
                e.preventDefault();
            }
        };

        const onTouchEnd = () => {
            handleTouchEnd();
        };

        trackElement.addEventListener("touchstart", onTouchStart, { passive: true });
        trackElement.addEventListener("touchmove", onTouchMove, { passive: false });
        trackElement.addEventListener("touchend", onTouchEnd, { passive: true });

        return () => {
            trackElement.removeEventListener("touchstart", onTouchStart);
            trackElement.removeEventListener("touchmove", onTouchMove);
            trackElement.removeEventListener("touchend", onTouchEnd);
        };
    }, [handleTouchStart, handleTouchMove, handleTouchEnd, isScrolling]);




    const handleDragStartWrapper = (event: any, info: PanInfo) => {
        if (!isScrolling()) {
            onDragStart();
        }
    };

    const handleDragWrapper = (event: any, info: PanInfo) => {
        if (isScrolling()) {
            return;
        }
    };

    const handleDragEndWrapper = (event: any, info: PanInfo) => {
        if (!isScrolling()) {
            onDragEnd(event, info);
        }
        handleTouchEnd();
    };
    return (
        <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={loop ? 0.2 : 0.1}
            dragTransition={{ power: 0.2, timeConstant: 200 }}
            dragListener={!isScrolling()}
            onDragStart={handleDragStartWrapper}
            onDragEnd={handleDragEndWrapper}
            whileDrag={{ cursor: "grabbing" }}
            style={{
                display: "flex",
                width: "100%",
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
                padding: containerPadding,
                gap: coverflow ? 0 : `${responsiveGap}px`,
                touchAction: "pan-y",
            }}
        >
            <motion.div
                animate={{
                    x: typeof transformX === "number" ? transformX : `${transformX}%`,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: skipAnimation ? 0 : isAnimating ? 0.3 : 0,
                }}
                style={{
                    display: "flex",
                    // KEY FIX: Use row-reverse for RTL to reverse slide order
                    flexDirection: "row",
                    width: "fit-content",
                    touchAction: "pan-y",
                    alignItems: "center",
                    gap: coverflow ? 0 : `${responsiveGap}px`,
                    ...(coverflow
                        ? { perspective: "1200px", transformStyle: "preserve-3d" }
                        : {}),
                }}
            >
                {displaySlides.map((slide, index) => {
                    const realSlideIndex = loop
                        ? (index - cloneCount + totalSlides) % totalSlides
                        : index;
                    const isActive = realIndex === realSlideIndex;

                    const dynamicClassName = getSlideClassName?.(realSlideIndex, isActive) || "";
                    const coverflowClassName = coverflow
                        ? getCoverflowClassName(realSlideIndex, isActive)
                        : "";
                    const dynamicStyle = getSlideStyle?.(realSlideIndex, isActive) || {};
                    const coverflowStyle = coverflow
                        ? getCoverflowStyle(index, isActive)
                        : {};

                    let finalSlideWidth;
                    if (coverflow) {
                        finalSlideWidth = getCoverflowSlideWidth(index);
                    } else {
                        finalSlideWidth = slideWidth;
                    }

                    return (
                        <SlideWrapper
                            key={index}
                            index={index}
                            realSlideIndex={realSlideIndex}
                            isActive={isActive}
                            slide={slide}
                            slideWidth={finalSlideWidth}
                            coverflow={coverflow}
                            slideClassName={slideClassName}
                            dynamicClassName={dynamicClassName}
                            coverflowClassName={coverflowClassName}
                            slideStyle={slideStyle}
                            dynamicStyle={dynamicStyle}
                            coverflowStyle={coverflowStyle}
                            renderSlide={renderSlide}
                        />
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

export default SliderTrack;