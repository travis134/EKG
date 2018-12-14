import { RenderContext, Coordinate, Area, LineStyle, TextStyle } from '../../src/RenderContext/RenderContext'

export class MockRenderContext implements RenderContext {
    private _clearRectOriginValues: Coordinate[] = new Array<Coordinate>();

    get clearRectOriginValues(): Coordinate[] {
        return this._clearRectOriginValues;
    }

    private _clearRectAreaValues: Area[] = new Array<Area>();

    get clearRectAreaValues(): Area[] {
        return this._clearRectAreaValues;
    }

    private _drawLineFromValues: Coordinate[] = new Array<Coordinate>();

    get drawLineFromValues(): Coordinate[] {
        return this._drawLineFromValues;
    }

    private _drawLineToValues: Coordinate[] = new Array<Coordinate>();

    get drawLineToValues(): Coordinate[] {
        return this._drawLineToValues;
    }

    private _drawLineLineStyleValues: LineStyle[] = new Array<LineStyle>();

    get drawLineLineStyleValues(): LineStyle[] {
        return this._drawLineLineStyleValues;
    }

    private _drawTextAtValues: Coordinate[] = new Array<Coordinate>();

    get drawTextAtValues(): Coordinate[] {
        return this._drawTextAtValues;
    }

    private _drawTextTextValues: string[] = new Array<string>();

    get drawTextTextValues(): string[] {
        return this._drawTextTextValues;
    }

    private _drawTextTextStyleValues: TextStyle[] = new Array<TextStyle>();

    get drawTextTextStyleValues(): TextStyle[] {
        return this._drawTextTextStyleValues;
    }

    public clearRect(origin: Coordinate, area: Area) {
        this._clearRectOriginValues.push(origin);
        this._clearRectAreaValues.push(area);
    }

    public drawLine(from: Coordinate, to: Coordinate, lineStyle: LineStyle) {
        this._drawLineFromValues.push(from);
        this._drawLineToValues.push(to);
        this._drawLineLineStyleValues.push(lineStyle);
    }

    public drawText(at: Coordinate, text: string, textStyle: TextStyle) {
        this._drawTextAtValues.push(at);
        this._drawTextTextValues.push(text);
        this._drawTextTextStyleValues.push(textStyle);
    }
}