
interface UseSliderNavigationProps {
    currentIndex: number;
    maxIndex: number;
    loop: boolean;
    direction: "ltr" | "rtl";
    setIsAnimating: (value: boolean) => void;
    setCurrentIndex: (value: number) => void;
    getRealIndexForIndex: (index: number) => number;
    getRealIndex: () => number;
    onSlideNext?: (currentIndex: number, nextIndex: number) => void;
    onSlidePrev?: (currentIndex: number, prevIndex: number) => void;
    onSlideChange?: (index: number) => void;
    totalSlides: number;
}

export const useSliderNavigation = ({
    currentIndex,
    maxIndex,
    loop,
    direction,
    setIsAnimating,
    setCurrentIndex,
    getRealIndexForIndex,
    getRealIndex,
    onSlideNext,
    onSlidePrev,
    onSlideChange,
    totalSlides,
}: UseSliderNavigationProps) => {
    const nextSlide = () => {
        if (!loop && currentIndex >= maxIndex) return;

        const currentRealIndex = getRealIndex();
        let nextIndex = currentIndex + 1;

        if (!loop) {
            nextIndex = Math.min(nextIndex, maxIndex);
        }

        setIsAnimating(true);
        setCurrentIndex(nextIndex);

        if (onSlideNext) {
            const targetRealIndex = getRealIndexForIndex(nextIndex);
            onSlideNext(currentRealIndex, targetRealIndex);
        }
    };

    const prevSlide = () => {
        if (!loop && currentIndex <= 0) return;

        const currentRealIndex = getRealIndex();
        let prevIndex = currentIndex - 1;

        if (!loop) {
            prevIndex = Math.max(prevIndex, 0);
        }

        setIsAnimating(true);
        setCurrentIndex(prevIndex);

        if (onSlidePrev) {
            const targetRealIndex = getRealIndexForIndex(prevIndex);
            onSlidePrev(currentRealIndex, targetRealIndex);
        }
    };

    const handleNext = () => {
        if (direction === "rtl") {
            prevSlide();
        } else {
            nextSlide();
        }
    };

    const handlePrev = () => {
        if (direction === "rtl") {
            nextSlide();
        } else {
            prevSlide();
        }
    };

    const goToSlide = (index: number) => {
        const currentRealIndex = getRealIndex();
        setIsAnimating(true);
        const newIndex = loop ? index : Math.max(0, Math.min(index, maxIndex));
        setCurrentIndex(newIndex);

        if (onSlideChange && newIndex !== currentRealIndex) {
            onSlideChange(newIndex);
        }
    };

const getPrevButtonDisabled = () => {
    if (totalSlides <= 1) return true; // ADD THIS
    if (loop) return false;
    return direction === "rtl" ? currentIndex >= maxIndex : currentIndex <= 0;
};

const getNextButtonDisabled = () => {
    if (totalSlides <= 1) return true; // ADD THIS
    if (loop) return false;
    return direction === "rtl" ? currentIndex <= 0 : currentIndex >= maxIndex;
};

    return {
        nextSlide,
        prevSlide,
        handleNext,
        handlePrev,
        goToSlide,
        getPrevButtonDisabled,
        getNextButtonDisabled,
    };
};