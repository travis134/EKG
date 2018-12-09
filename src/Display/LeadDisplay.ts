import { Display } from './Display';
import { RenderContext, Coordinate, Area, LineStyle, Origin } from '../RenderContext/RenderContext';
import { Lead } from '../Lead/Lead';
import { TimeKeeper } from '../TimeKeeper/TimeKeeper';

export class LeadDisplay implements Display {
    private static readonly SecondsPerStrip = 6;
    private static readonly Color = 'Green';
    private static readonly LineStyle: LineStyle = {
        color: LeadDisplay.Color,
        alpha: 1,
        width: 2,
        shadowStyle: {
            color: LeadDisplay.Color,
            blur: 20
        }
    };
    private static readonly EraseAheadWidth = 40;

    private lastCoordinate: Coordinate | null = null;
    private middleValue: number;

    constructor(
        private renderContext: RenderContext,
        private area: Area,
        private lead: Lead,
        private timeKeeper: TimeKeeper
    ) {
        this.middleValue = this.area.height / 2;
    }

    public draw() {
        const currentCoordinate = this.getCurrentCoordinate();

        if (this.lastCoordinate !== null && this.lastCoordinate.x < currentCoordinate.x) {
            this.eraseAheadOfCoordinate(currentCoordinate);
            this.renderContext.drawLine(
                this.lastCoordinate,
                currentCoordinate,
                LeadDisplay.LineStyle
            );
        }

        this.lastCoordinate = currentCoordinate;
    }

    public clear() {
        this.renderContext.clearRect(Origin, this.area);
    }

    private eraseAheadOfCoordinate(coordinate: Coordinate) {
        const origin = {
            x: coordinate.x,
            y: 0
        };

        const area = {
            width: LeadDisplay.EraseAheadWidth,
            height: this.area.height
        };

        this.renderContext.clearRect(origin, area);
    }

    private getCurrentCoordinate(): Coordinate {
        const x = this.getWrappedXValue();
        const y = this.getNormalizedYValue();

        return { x, y };
    }

    private getWrappedXValue(): number {
        const elapsedMs = this.timeKeeper.getElapsedMs();
        const elapsedSeconds = elapsedMs / 1000;
        const wrappedSeconds = elapsedSeconds % LeadDisplay.SecondsPerStrip;

        return (wrappedSeconds / LeadDisplay.SecondsPerStrip) * this.area.width;
    }

    private getNormalizedYValue(): number {
        const voltage = this.lead.measureVoltage();
        const normalizedValue = -voltage * this.middleValue + this.middleValue;

        return Math.max(0, Math.min(this.area.height, normalizedValue));
    }
}
