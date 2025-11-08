import React from "react";
import { motion } from "framer-motion";

interface SliderControlsProps {
    showButtons: boolean;
    showDots: boolean;
    direction: "ltr" | "rtl";
    responsiveGap: number;
    totalSlides: number;
    realIndex: number;
    getPrevButtonDisabled: () => boolean;
    getNextButtonDisabled: () => boolean;
    handlePrev: () => void;
    handleNext: () => void;
    goToSlide: (index: number) => void;
}

const SliderControls: React.FC<SliderControlsProps> = ({
    showButtons,
    showDots,
    direction,
    responsiveGap,
    totalSlides,
    realIndex,
    getPrevButtonDisabled,
    getNextButtonDisabled,
    handlePrev,
    handleNext,
    goToSlide,
}) => {
    if (!showButtons && !showDots) return null;

    // RTL: Swap button labels but keep functionality the same
    const prevLabel = direction === "rtl" ? "التالي ←" : "← Previous";
    const nextLabel = direction === "rtl" ? "→ السابق" : "Next →";

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: responsiveGap,
                marginTop: 18,
                direction: "ltr", // Always LTR for controls layout
            }}
        >
            {showButtons && (
                <motion.button
                    onClick={handlePrev}
                    disabled={getPrevButtonDisabled()}
                    whileHover={{ scale: getPrevButtonDisabled() ? 1 : 1.06 }}
                    whileTap={{ scale: getPrevButtonDisabled() ? 1 : 0.96 }}
                    style={{
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: 6,
                        backgroundColor: getPrevButtonDisabled() ? "#ddd" : "#007bff",
                        color: "white",
                        cursor: getPrevButtonDisabled() ? "not-allowed" : "pointer",
                    }}
                >
                    {prevLabel}
                </motion.button>
            )}

            {showDots && (
                <div style={{ display: "flex", gap: 8, direction: "ltr" }}>
                    {Array.from({ length: totalSlides }).map((_, idx) => {
                        const dotIndex = direction === "rtl" ? totalSlides - 1 - idx : idx;
                        const isActiveDot = realIndex === dotIndex;
                        return (
                            <motion.button
                                key={idx}
                                onClick={() => goToSlide(dotIndex)}
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: "50%",
                                    border: "none",
                                    backgroundColor: isActiveDot ? "#007bff" : "#ccc",
                                    cursor: "pointer",
                                }}
                                aria-label={`Go to slide ${dotIndex + 1}`}
                            />
                        );
                    })}
                </div>
            )}

            {showButtons && (
                <motion.button
                    onClick={handleNext}
                    disabled={getNextButtonDisabled()}
                    whileHover={{ scale: getNextButtonDisabled() ? 1 : 1.06 }}
                    whileTap={{ scale: getNextButtonDisabled() ? 1 : 0.96 }}
                    style={{
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: 6,
                        backgroundColor: getNextButtonDisabled() ? "#ddd" : "#007bff",
                        color: "white",
                        cursor: getNextButtonDisabled() ? "not-allowed" : "pointer",
                    }}
                >
                    {nextLabel}
                </motion.button>
            )}
        </div>
    );
};

export default SliderControls;