export const getAdjustedSlidesToShow = (
    effectiveSlidesToShow: number,
    totalSlides: number,
    loop: boolean
): number => {
    if (totalSlides === 0) return effectiveSlidesToShow;

    if (effectiveSlidesToShow > totalSlides) {
        if (loop) {
            return Math.min(
                effectiveSlidesToShow,
                Math.ceil(effectiveSlidesToShow / totalSlides) * totalSlides
            );
        } else {
            return Math.min(effectiveSlidesToShow, totalSlides);
        }
    }

    return effectiveSlidesToShow;
};

export const getMaxIndex = (
    totalSlides: number,
    loop: boolean,
    isCenter: boolean,
    coverflow: boolean,
    adjustedSlidesToShow: number
): number => {
    if (totalSlides === 0) return 0;

    if (loop) return totalSlides;
    if (isCenter || coverflow) return Math.max(0, totalSlides - 1);
    return Math.max(0, totalSlides - adjustedSlidesToShow);
};

export const getRealIndexForIndex = (
    index: number,
    loop: boolean,
    totalSlides: number,
    maxIndex: number
): number => {
    if (!loop) return Math.max(0, Math.min(index, maxIndex));

    let realIdx = index % totalSlides;
    if (realIdx < 0) realIdx += totalSlides;
    return realIdx;
};

export const getSlideWidth = (
    coverflow: boolean,
    containerWidth: number,
    totalSlides: number,
    adjustedSlidesToShow: number,
    responsiveGap: number
): number | string => {
    if (coverflow) {
        return containerWidth ? containerWidth * 0.95 : "95%";
    }

    if (!containerWidth || totalSlides === 0) {
        const gapTotal = Math.max(0, (adjustedSlidesToShow - 1) * responsiveGap);
        return `calc((100% - ${gapTotal}px) / ${Math.max(1, adjustedSlidesToShow)})`;
    }

    const totalGapWidth = (adjustedSlidesToShow - 1) * responsiveGap;
    const availableWidth = containerWidth - totalGapWidth;
    const slideWidth = Math.max(0, availableWidth / adjustedSlidesToShow);

    return slideWidth;
};

export const getTransformX = (
    coverflow: boolean,
    containerWidth: number,
    currentIndex: number,
    realIndex: number,
    loop: boolean,
    cloneCount: number,
    slideWidth: number | string,
    responsiveGap: number,
    isCenter: boolean,
    maxIndex: number,
    adjustedSlidesToShow: number,
    coverflowOptions: { centerSlideWidth?: number },
    totalSlides: number
): number | string => {
    if (coverflow) {
        if (!containerWidth) return 0;

        const centerWidth = coverflowOptions.centerSlideWidth || 95;
        const sideWidth = (100 - centerWidth) / 2;

        const centerSlideWidth = (containerWidth * centerWidth) / 100;
        const sideSlideWidth = (containerWidth * sideWidth) / 100;

        let offset = 0;
        const startIndex = loop ? cloneCount : 0;
        const activeIndex = loop ? currentIndex + cloneCount : currentIndex;

        for (let i = startIndex; i < activeIndex; i++) {
            const realIdx = loop
                ? (i - cloneCount + totalSlides) % totalSlides
                : i;
            const isActiveSlide = realIdx === realIndex;

            if (isActiveSlide) {
                offset += centerSlideWidth;
            } else {
                offset += sideSlideWidth;
            }
            offset += responsiveGap;
        }

        const centerOffset = containerWidth / 2 - centerSlideWidth / 2;

        return centerOffset - offset;
    }

    if (typeof slideWidth === "number") {
        let totalMoveDistance;
        const activeIndex = loop ? currentIndex + cloneCount : currentIndex;

        // Calculate base movement
        if (loop) {
            totalMoveDistance =
                activeIndex * slideWidth + activeIndex * responsiveGap;
        } else {
            const boundedIndex = Math.min(currentIndex, maxIndex);
            totalMoveDistance =
                boundedIndex * slideWidth + boundedIndex * responsiveGap;
        }

        // Apply center offset
        if (isCenter) {
            // Center the active slide in the viewport
            const centerOffset = (containerWidth - slideWidth) / 2;
            totalMoveDistance -= centerOffset;
        }

        return -totalMoveDistance;
    } else {
        const slideWidthPercentage = 100 / Math.max(1, adjustedSlidesToShow);
        let transform = 0;

        if (loop) {
            transform = -(currentIndex + cloneCount) * slideWidthPercentage;
        } else {
            transform = -Math.min(currentIndex, maxIndex) * slideWidthPercentage;
        }

        if (isCenter) {
            const centerOffset = (100 - slideWidthPercentage) / 2;
            transform += centerOffset;
        }

        return transform;
    }
};


export const getContainerPadding = (
    coverflow: boolean,
    isCenter: boolean,
    loop: boolean,
    slideWidth: number | string,
    adjustedSlidesToShow: number,
    responsiveGap: number,
    containerWidth: number
): string => {
    if (coverflow) return "0";

    if (isCenter && !loop) {
        if (typeof slideWidth === "number") {
            const totalWidth =
                adjustedSlidesToShow * slideWidth +
                (adjustedSlidesToShow - 1) * responsiveGap;
            const padding = (containerWidth - totalWidth) / 2;
            return `0 ${Math.max(0, padding)}px`;
        } else {
            const totalWidth =
                adjustedSlidesToShow * (100 / adjustedSlidesToShow) +
                (adjustedSlidesToShow - 1) * responsiveGap;
            const padding = (100 - totalWidth) / 2;
            return `0 ${Math.max(0, padding)}%`;
        }
    }
    return "0";
};