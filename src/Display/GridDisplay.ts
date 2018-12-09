import { Display } from './Display';
import { RenderContext, Area, LineStyle, Origin } from '../RenderContext/RenderContext';

export class GridDisplay implements Display {
    private static readonly SecondsPerStrip = 6;
    private static readonly SquareSubdivision = 5;
    private static readonly Color = 'Green';
    private static readonly Alpha = 1 / 8;

    private static readonly LargeGridLineStyle: LineStyle = {
        color: GridDisplay.Color,
        alpha: GridDisplay.Alpha,
        width: 2
    };

    private static readonly SmallGridLineStyle: LineStyle = {
        color: GridDisplay.Color,
        alpha: GridDisplay.Alpha,
        width: 1
    };

    private largeSquareWidth: number;
    private smallSquareWidth: number;

    constructor(private renderContext: RenderContext, private area: Area) {
        this.largeSquareWidth =
            this.area.width / GridDisplay.SecondsPerStrip / GridDisplay.SquareSubdivision;
        this.smallSquareWidth = this.largeSquareWidth / GridDisplay.SquareSubdivision;
    }

    public draw() {
        this.drawGrid(this.largeSquareWidth, GridDisplay.LargeGridLineStyle);
        this.drawGrid(this.smallSquareWidth, GridDisplay.SmallGridLineStyle);
    }

    public clear() {
        this.renderContext.clearRect(Origin, this.area);
    }

    private drawGrid(squareWidth: number, lineStyle: LineStyle) {
        for (let x = 0; x <= this.area.width; x += squareWidth) {
            this.renderContext.drawLine({ x, y: 0 }, { x, y: this.area.height }, lineStyle);
        }

        for (let y = 0; y <= this.area.height; y += squareWidth) {
            this.renderContext.drawLine({ x: 0, y }, { x: this.area.width, y }, lineStyle);
        }
    }
}
