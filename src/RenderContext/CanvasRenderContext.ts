import { RenderContext, Coordinate, Area, LineStyle, TextStyle } from './RenderContext';

export class CanvasRenderContext implements RenderContext {
    constructor(private canvasContext2D: CanvasRenderingContext2D) {}

    public clearRect(origin: Coordinate, area: Area) {
        this.canvasContext2D.clearRect(origin.x, origin.y, area.width, area.height);
    }

    public drawLine(from: Coordinate, to: Coordinate, lineStyle: LineStyle) {
        this.canvasContext2D.strokeStyle = lineStyle.color;
        this.canvasContext2D.globalAlpha = lineStyle.alpha;
        this.canvasContext2D.lineWidth = lineStyle.width;

        if (lineStyle.shadowStyle) {
            this.canvasContext2D.shadowColor = lineStyle.shadowStyle.color;
            this.canvasContext2D.shadowBlur = lineStyle.shadowStyle.blur;
        }

        this.canvasContext2D.beginPath();
        this.canvasContext2D.moveTo(from.x, from.y);
        this.canvasContext2D.lineTo(to.x, to.y);
        this.canvasContext2D.stroke();
    }

    public drawText(at: Coordinate, text: string, textStyle: TextStyle) {
        const { font, color, size } = textStyle;
        this.canvasContext2D.font = `${size} ${font}`;
        this.canvasContext2D.fillStyle = color;
        this.canvasContext2D.fillText(text, at.x, at.y);
    }
}
