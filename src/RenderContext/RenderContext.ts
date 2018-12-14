export interface Coordinate {
    x: number;
    y: number;
}

export const Origin: Coordinate = {
    x: 0,
    y: 0
};

export interface Area {
    width: number;
    height: number;
}

export interface ShadowStyle {
    color: string;
    blur: number;
}

export interface LineStyle {
    color: string;
    alpha: number;
    width: number;
    shadowStyle?: ShadowStyle;
}

export interface TextStyle {
    color: string;
    font: string;
    size: number;
}

export interface RenderContext {
    clearRect(origin: Coordinate, area: Area): void;
    drawLine(from: Coordinate, to: Coordinate, lineStyle: LineStyle): void;
    drawText(at: Coordinate, text: string, textStyle: TextStyle): void;
}
