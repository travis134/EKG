import { RenderContext, Coordinate, Area, LineStyle, TextStyle } from './RenderContext';

export class LogRenderContext implements RenderContext {
    public clearRect(origin: Coordinate, area: Area) {
        const originString = this.stringifyCoordinate(origin);
        const areaString = this.stringifyArea(area);

        console.log(`clearRect origin: ${originString}, area: ${areaString}`);
    }

    public drawLine(from: Coordinate, to: Coordinate, lineStyle: LineStyle) {
        const fromString = this.stringifyCoordinate(from);
        const toString = this.stringifyCoordinate(to);

        console.log(`drawLine from: ${fromString}, to: ${toString}, color: ${lineStyle.color}`);
    }

    public drawText(at: Coordinate, text: string, textStyle: TextStyle) {
        const atString = this.stringifyCoordinate(at);

        console.log(`drawText at: ${atString}, text: ${text}, color: ${textStyle.font}`);
    }

    private stringifyCoordinate(coordinate: Coordinate) {
        return `(${coordinate.x.toFixed(2)}, ${coordinate.y.toFixed(2)})`;
    }

    private stringifyArea(area: Area) {
        return `(${area.width.toFixed(2)}, ${area.height.toFixed(2)})`;
    }
}
