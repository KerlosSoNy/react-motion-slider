import { CoverflowOptions } from "./types";

export const DEFAULT_COVERFLOW_OPTIONS: Required<CoverflowOptions> = {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
    centerSlideWidth: 95,
};

export const DEFAULT_AUTOSCROLL_INTERVAL = 3000;
export const DEFAULT_GAP = 20;
export const DRAG_THRESHOLD = 50;
export const VELOCITY_THRESHOLD = 100;
export const ANIMATION_DURATION = 300;