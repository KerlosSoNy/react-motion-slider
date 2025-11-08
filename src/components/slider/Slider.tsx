'use client'
import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { SliderProps, SliderRef } from "./types";
import { DEFAULT_COVERFLOW_OPTIONS, DRAG_THRESHOLD, VELOCITY_THRESHOLD } from "./constants";
import { useSliderState, useLoopReset } from "./hooks/useSliderState";
import { useBreakpoints } from "./hooks/useBreakpoints";
import { useSliderNavigation } from "./hooks/useSliderNavigation";
import { useAutoScroll } from "./hooks/useAutoScroll";
import {
    getAdjustedSlidesToShow,
    getMaxIndex,
    getRealIndexForIndex,
    getSlideWidth,
    getTransformX,
    getContainerPadding,
} from "./utils/calculations";
import {
    getCoverflowSlideWidth,
    getCoverflowStyle,
    getCoverflowClassName,
} from "./utils/coverflow";
import { getClonedSlides, getCloneCount } from "./utils/slides";
import SliderTrack from "./components/SliderTrack";
import SliderControls from "./components/SliderControls";

const Slider = forwardRef<SliderRef, SliderProps>(
    (
        {
            slidesToShow,
            children,
            isHidden = false,
            direction = "ltr",
            loop = false,
            language = "en",
            onSlideChange,
            onSlideNext,
            onSlidePrev,
            isCenter = false,
            gap = 20,
            breakpoints = {},
            slideClassName = "",
            slideStyle = {},
            getSlideClassName,
            getSlideStyle,
            renderSlide,
            coverflow = false,
            coverflowOptions = {},
            showDebug = false,
            showButtons = true,
            showDots = true,
            autoScroll = false,
            autoScrollInterval = 3000,
            autoScrollDirection = "next",
            pauseOnHover = true,
            pauseOnFocus = true,
        },
        ref
    ) => {
        const childrenArray = React.Children.toArray(children);
        const totalSlides = childrenArray.length;

        // Merge coverflow options with defaults
        const mergedCoverflowOptions = {
            ...DEFAULT_COVERFLOW_OPTIONS,
            ...coverflowOptions,
        };

        // Use custom hooks
        const {
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
        } = useSliderState();




        const { currentSlidesToShow, currentGap, containerWidth, containerRef } =
            useBreakpoints(breakpoints, slidesToShow, gap);

        const responsiveSlidesToShow =
            Object.keys(breakpoints).length > 0 ? currentSlidesToShow : slidesToShow;
        const responsiveGap = Object.keys(breakpoints).length > 0 ? currentGap : gap;

        // Override slidesToShow for coverflow mode
        const effectiveSlidesToShow = coverflow ? 3 : responsiveSlidesToShow;

        const adjustedSlidesToShow = getAdjustedSlidesToShow(
            effectiveSlidesToShow,
            totalSlides,
            loop
        );

        const maxIndex = getMaxIndex(
            totalSlides,
            loop,
            isCenter,
            coverflow,
            adjustedSlidesToShow
        );

        // Get slides with cloning for loop mode
        const displaySlides = getClonedSlides(
            children,
            loop,
            adjustedSlidesToShow,
        );

        const cloneCount = getCloneCount(loop, adjustedSlidesToShow, totalSlides);

        // Real index calculations
        const getRealIndex = () =>
            getRealIndexForIndex(currentIndex, loop, totalSlides, maxIndex);
        const realIndex = getRealIndex();

        // Navigation hook
        const {
            handleNext,
            handlePrev,
            goToSlide,
            getPrevButtonDisabled,
            getNextButtonDisabled,
        } = useSliderNavigation({
            currentIndex,
            maxIndex,
            loop,
            direction,
            setIsAnimating,
            setCurrentIndex,
            getRealIndexForIndex: (index: number) =>
                getRealIndexForIndex(index, loop, totalSlides, maxIndex),
            getRealIndex,
            onSlideNext,
            onSlidePrev,
            onSlideChange,
            totalSlides,
        });

        // Autoscroll hook
        const { isAutoScrolling, startAutoScroll, stopAutoScroll, toggleAutoScroll } =
            useAutoScroll({
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
            });

        // Loop reset effect
        useLoopReset(
            currentIndex,
            loop,
            totalSlides,
            setSkipAnimation,
            setIsAnimating,
            setCurrentIndex
        );

        // Calculate slide width
        const slideWidth = getSlideWidth(
            coverflow,
            containerWidth,
            totalSlides,
            adjustedSlidesToShow,
            responsiveGap
        );

        // Calculate transform
        let transformX = getTransformX(
            coverflow,
            containerWidth,
            currentIndex,
            realIndex,
            loop,
            cloneCount,
            slideWidth,
            responsiveGap,
            isCenter,
            maxIndex,
            adjustedSlidesToShow,
            mergedCoverflowOptions,
            totalSlides
        );

        if (direction === "rtl") {
            if (typeof transformX === "number") {
                transformX = -transformX;
            } else {
                const value = parseFloat(String(transformX));
                transformX = `${-value}%`;
            }
        }

        // Get container padding
        const containerPadding = getContainerPadding(
            coverflow,
            isCenter,
            loop,
            slideWidth,
            adjustedSlidesToShow,
            responsiveGap,
            containerWidth
        );

        // Drag handling
        const handleDragStart = () => {
            setIsDragging(true);
            setIsAnimating(false);
            stopAutoScroll();
        };

        const handleDragEnd = (event: any, info: PanInfo) => {
            setIsDragging(false);

            const { velocity, offset } = info;

            if (
                Math.abs(velocity.x) > VELOCITY_THRESHOLD ||
                Math.abs(offset.x) > DRAG_THRESHOLD
            ) {
                setIsAnimating(true);
                if (offset.x < 0 || velocity.x < 0) {
                    handleNext();
                } else {
                    handlePrev();
                }
            } else {
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 150);
            }

            // Restart autoscroll after drag
            if (autoScroll) {
                setTimeout(() => startAutoScroll(), autoScrollInterval);
            }
        };

        // Mouse and focus events
        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);
        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        // Expose methods via ref
        useImperativeHandle(ref, () => ({
            next: handleNext,
            prev: handlePrev,
            goTo: goToSlide,
            getCurrentIndex: () => currentIndex,
            getRealIndex: () => realIndex,
            startAutoScroll,
            stopAutoScroll,
            toggleAutoScroll,
        }));

        // Reset index on direction or slidesToShow change
        useEffect(() => {
            setCurrentIndex(0);
        }, [direction, responsiveSlidesToShow]);

        // Call onSlideChange when realIndex changes
        useEffect(() => {
            onSlideChange?.(realIndex);
        }, [realIndex, onSlideChange]);

        // Helper functions for coverflow
        const getCoverflowSlideWidthWrapper = (index: number) =>
            getCoverflowSlideWidth(
                index,
                containerWidth,
                loop,
                cloneCount,
                totalSlides,
                realIndex,
                mergedCoverflowOptions
            );

        const getCoverflowStyleWrapper = (index: number, isActive: boolean) =>
            getCoverflowStyle(
                index,
                isActive,
                coverflow,
                loop,
                cloneCount,
                totalSlides,
                realIndex,
                mergedCoverflowOptions
            );

        const getCoverflowClassNameWrapper = (index: number, isActive: boolean) =>
            getCoverflowClassName(index, isActive, coverflow);

        if (totalSlides === 0) {
            return <div>No slides to display</div>;
        }

        return (
            <motion.div
                ref={containerRef}
                key={`${language}-${direction}-${responsiveSlidesToShow}`}
                dir={direction}
                className='no-select'
                style={{
                    width: "100%",
                    overflow: isHidden ? "hidden" : "unset",
                    position: "relative",
                    touchAction: "pan-y pinch-zoom",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                {/* Slider Track */}
                <SliderTrack
                    displaySlides={displaySlides}
                    isDragging={isDragging}
                    isAnimating={isAnimating}
                    skipAnimation={skipAnimation}
                    transformX={transformX}
                    direction={direction}
                    coverflow={coverflow}
                    responsiveGap={responsiveGap}
                    containerPadding={containerPadding}
                    loop={loop}
                    cloneCount={cloneCount}
                    totalSlides={totalSlides}
                    realIndex={realIndex}
                    slideWidth={slideWidth}
                    slideClassName={slideClassName}
                    slideStyle={slideStyle}
                    getSlideClassName={getSlideClassName}
                    getSlideStyle={getSlideStyle}
                    getCoverflowSlideWidth={getCoverflowSlideWidthWrapper}
                    getCoverflowStyle={getCoverflowStyleWrapper}
                    getCoverflowClassName={getCoverflowClassNameWrapper}
                    renderSlide={renderSlide}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                />

                {/* Controls */}
                <SliderControls
                    showButtons={showButtons}
                    showDots={showDots}
                    direction={direction}
                    responsiveGap={responsiveGap}
                    totalSlides={totalSlides}
                    realIndex={realIndex}
                    getPrevButtonDisabled={getPrevButtonDisabled}
                    getNextButtonDisabled={getNextButtonDisabled}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    goToSlide={goToSlide}
                />

                {/* Debug Info */}
                {showDebug && (
                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "10px",
                            fontSize: "12px",
                            color: "#666",
                            fontFamily: "monospace",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-all",
                        }}
                    >
                        Current: {currentIndex} | Real: {realIndex} | Total: {totalSlides} |
                        Display: {displaySlides.length} | SlidesToShow: {responsiveSlidesToShow} |
                        Adjusted: {adjustedSlidesToShow} | CloneCount: {cloneCount} | Container:{" "}
                        {containerWidth}px | Gap: {responsiveGap}px | Slide:{" "}
                        {typeof slideWidth === "number"
                            ? `${slideWidth.toFixed(1)}px`
                            : slideWidth}{" "}
                        | Transform:{" "}
                        {typeof transformX === "number"
                            ? `${transformX.toFixed(1)}px`
                            : `${transformX}%`}{" "}
                        | Center: {isCenter ? "Yes" : "No"} | Loop: {loop ? "Yes" : "No"} |
                        Coverflow: {coverflow ? "Yes" : "No"} | Autoscroll:{" "}
                        {isAutoScrolling ? "Yes" : "No"}
                    </div>
                )}
            </motion.div>
        );
    }
);

Slider.displayName = "Slider";

export default Slider;