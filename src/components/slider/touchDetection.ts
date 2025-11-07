export interface DragDirection {
    isHorizontal: boolean;
    isVertical: boolean;
    isDetermined: boolean;
}

export class TouchDirectionDetector {
    private startX: number = 0;
    private startY: number = 0;
    private currentX: number = 0;
    private currentY: number = 0;
    private direction: DragDirection = {
        isHorizontal: false,
        isVertical: false,
        isDetermined: false,
    };
    private threshold: number = 10; // Minimum pixels to determine direction

    start(x: number, y: number) {
        this.startX = x;
        this.startY = y;
        this.currentX = x;
        this.currentY = y;
        this.direction = {
            isHorizontal: false,
            isVertical: false,
            isDetermined: false,
        };
    }

    move(x: number, y: number): DragDirection {
        this.currentX = x;
        this.currentY = y;

        if (this.direction.isDetermined) {
            return this.direction;
        }

        const deltaX = Math.abs(this.currentX - this.startX);
        const deltaY = Math.abs(this.currentY - this.startY);

        // Only determine direction after threshold is exceeded
        if (deltaX > this.threshold || deltaY > this.threshold) {
            this.direction.isDetermined = true;
            
            if (deltaX > deltaY) {
                this.direction.isHorizontal = true;
                this.direction.isVertical = false;
            } else {
                this.direction.isHorizontal = false;
                this.direction.isVertical = true;
            }
        }

        return this.direction;
    }

    reset() {
        this.direction = {
            isHorizontal: false,
            isVertical: false,
            isDetermined: false,
        };
    }

    getDirection(): DragDirection {
        return this.direction;
    }
}