import { useState, useEffect, useRef } from "react";
import { Breakpoints } from "../types";

export const useBreakpoints = (
    breakpoints: Breakpoints,
    defaultSlidesToShow: number,
    defaultGap: number
) => {
    const [currentSlidesToShow, setCurrentSlidesToShow] = useState(defaultSlidesToShow);
    const [currentGap, setCurrentGap] = useState(defaultGap);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const getCurrentBreakpointConfig = () => {
        if (typeof window === "undefined")
            return { slidesPerView: defaultSlidesToShow, spaceBetween: defaultGap };

        const windowWidth = window.innerWidth;
        const breakpointKeys = Object.keys(breakpoints)
            .map(Number)
            .sort((a, b) => a - b);

        let activeConfig = { slidesPerView: defaultSlidesToShow, spaceBetween: defaultGap };

        for (const breakpoint of breakpointKeys) {
            if (windowWidth >= breakpoint) {
                activeConfig = breakpoints[breakpoint];
            } else {
                break;
            }
        }

        return activeConfig;
    };

    // Get container width
    useEffect(() => {
        const updateContainerWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        updateContainerWidth();
        window.addEventListener("resize", updateContainerWidth);
        return () => window.removeEventListener("resize", updateContainerWidth);
    }, []);

    // Handle window resize and breakpoints
    useEffect(() => {
        const handleResize = () => {
            const config = getCurrentBreakpointConfig();
            setCurrentSlidesToShow(config.slidesPerView);
            setCurrentGap(config.spaceBetween);

            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoints, defaultSlidesToShow, defaultGap]);

    return {
        currentSlidesToShow,
        currentGap,
        containerWidth,
        containerRef,
    };
};