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

    return (
        <div
            className="z-10000 relative flex flex-row"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: responsiveGap,
                marginTop: 18,
                direction: "ltr",
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
                    {direction === "rtl" ? "Next →" : "← Previous"}
                </motion.button>
            )}

            {showDots && (
                <div style={{ display: "flex", gap: 8 }}>
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                        <div key={idx} onClick={() => goToSlide(idx)} className={`w-2 hover:cursor-pointer h-2 outline-0 rounded-full hover:scale-105  ${realIndex === idx ? "bg-[#007bff]" : "bg-[#ccc]"}`} />
                    ))}
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
                    {direction === "rtl" ? "Previous ←" : "Next →"}
                </motion.button>
            )}
        </div>
    );
};

export default SliderControls;