import React from "react";
import { motion } from "framer-motion";

interface SlideWrapperProps {
    index: number;
    realSlideIndex: number;
    isActive: boolean;
    slide: React.ReactNode;
    slideWidth: number | string;
    coverflow: boolean;
    slideClassName: string;
    dynamicClassName: string;
    coverflowClassName: string;
    slideStyle: React.CSSProperties;
    dynamicStyle: React.CSSProperties;
    coverflowStyle: React.CSSProperties;
    renderSlide?: (
        slide: React.ReactNode,
        index: number,
        isActive: boolean,
        realIndex: number
    ) => React.ReactNode;
}

const SlideWrapper: React.FC<SlideWrapperProps> = ({
    index,
    realSlideIndex,
    isActive,
    slide,
    slideWidth,
    coverflow,
    slideClassName,
    dynamicClassName,
    coverflowClassName,
    slideStyle,
    dynamicStyle,
    coverflowStyle,
    renderSlide,
}) => {
    const finalSlideWidth =
        typeof slideWidth === "number" ? `${slideWidth}px` : slideWidth;

    const slideContent = renderSlide ? (
        renderSlide(slide, index, isActive, realSlideIndex)
    ) : (
        <motion.div
            transition={{ type: "spring", stiffness: 400 }}
            style={{
                height: "100%",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "bold",
                userSelect: "none",
                ...(coverflow ? { transformStyle: "preserve-3d" } : {}),
            }}
        >
            {slide}
        </motion.div>
    );

    return (
        <div
            key={index}
            style={{
                flex: coverflow ? `0 0 ${finalSlideWidth}` : `0 0 ${finalSlideWidth}`,
                boxSizing: "border-box",
                minWidth: 0,
                ...slideStyle,
                ...dynamicStyle,
                ...coverflowStyle,
            }}
            className={`${slideClassName} ${dynamicClassName} ${coverflowClassName}`.trim()}
        >
            {slideContent}
        </div>
    );
};

export default SlideWrapper;