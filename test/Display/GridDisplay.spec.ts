import { expect } from 'chai';

import { GridDisplay } from '../../src/Display/GridDisplay';
import { MockRenderContext } from '../RenderContext/MockRenderContext';
import { Area, Origin } from '../../src/RenderContext/RenderContext';

describe('GridDisplay', () => {
    let gridDisplay: GridDisplay;
    let mockRenderContext: MockRenderContext;
    const area: Area = { width: 600, height: 300 };

    beforeEach(() => {
        mockRenderContext = new MockRenderContext();
        gridDisplay = new GridDisplay(mockRenderContext, area);
    });

    it('should clear the entire area', () => {
        gridDisplay.clear();

        const clearRectOrigin = mockRenderContext.clearRectOriginValues[0];
        const clearReactArea = mockRenderContext.clearRectAreaValues[0];

        expect(clearRectOrigin).to.deep.equal(Origin);
        expect(clearReactArea).to.deep.equal(area);
    });

    it('should render large squares', () => {
        gridDisplay.draw();

        const largeSquareLines = mockRenderContext.drawLineLineStyleValues.filter(
            lineStyle => lineStyle.width === 2
        ).length;
        expect(largeSquareLines).to.equal(47);

        const line1From = mockRenderContext.drawLineFromValues[0];
        const line1To = mockRenderContext.drawLineToValues[0];
        expect(line1From).to.deep.equal(Origin);
        expect(line1To).to.deep.equal({ x: 0, y: 300 });

        const line2From = mockRenderContext.drawLineFromValues[1];
        const line2To = mockRenderContext.drawLineToValues[1];
        expect(line2From).to.deep.equal({ x: 20, y: 0 });
        expect(line2To).to.deep.equal({ x: 20, y: 300 });

        const line3From = mockRenderContext.drawLineFromValues[31];
        const line3To = mockRenderContext.drawLineToValues[31];
        expect(line3From).to.deep.equal(Origin);
        expect(line3To).to.deep.equal({ x: 600, y: 0 });

        const line4From = mockRenderContext.drawLineFromValues[32];
        const line4To = mockRenderContext.drawLineToValues[32];
        expect(line4From).to.deep.equal({ x: 0, y: 20 });
        expect(line4To).to.deep.equal({ x: 600, y: 20 });
    });

    it('should render small squares', () => {
        gridDisplay.draw();

        const smallSquareLines = mockRenderContext.drawLineLineStyleValues.filter(
            lineStyle => lineStyle.width === 1
        ).length;
        expect(smallSquareLines).to.equal(227);

        const line1From = mockRenderContext.drawLineFromValues[47];
        const line1To = mockRenderContext.drawLineToValues[47];
        expect(line1From).to.deep.equal(Origin);
        expect(line1To).to.deep.equal({ x: 0, y: 300 });

        const line2From = mockRenderContext.drawLineFromValues[48];
        const line2To = mockRenderContext.drawLineToValues[48];
        expect(line2From).to.deep.equal({ x: 4, y: 0 });
        expect(line2To).to.deep.equal({ x: 4, y: 300 });

        const line3From = mockRenderContext.drawLineFromValues[198];
        const line3To = mockRenderContext.drawLineToValues[198];
        expect(line3From).to.deep.equal(Origin);
        expect(line3To).to.deep.equal({ x: 600, y: 0 });

        const line4From = mockRenderContext.drawLineFromValues[199];
        const line4To = mockRenderContext.drawLineToValues[199];
        expect(line4From).to.deep.equal({ x: 0, y: 4 });
        expect(line4To).to.deep.equal({ x: 600, y: 4 });
    });
});
