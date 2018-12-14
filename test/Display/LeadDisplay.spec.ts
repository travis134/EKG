import { expect } from 'chai'

import { LeadDisplay } from '../../src/Display/LeadDisplay'
import { MockRenderContext } from '../RenderContext/MockRenderContext'
import { MockLead } from '../Lead/MockLead';
import { MockTimeKeeper } from '../TimeKeeper/MockTimeKeeper'
import { Area, Origin } from '../../src/RenderContext/RenderContext'

describe('LeadDisplay', () => {
    let leadDisplay: LeadDisplay;
    let mockRenderContext: MockRenderContext;
    let mockLead: MockLead;
    let mockTimeKeeper: MockTimeKeeper;
    const area: Area = {width: 600, height: 300};

    beforeEach(() => {
        mockRenderContext = new MockRenderContext();
        mockLead = new MockLead();
        mockTimeKeeper = new MockTimeKeeper();
        leadDisplay = new LeadDisplay(mockRenderContext, area, mockLead, mockTimeKeeper);
    });
    
    it('should clear the entire area', () => {
        leadDisplay.clear();

        const clearRectOrigin= mockRenderContext.clearRectOriginValues[0];
        const clearReactArea= mockRenderContext.clearRectAreaValues[0];

        expect(clearRectOrigin).to.deep.equal(Origin);
        expect(clearReactArea).to.deep.equal(area);
    });

    it('should not render when there is only one datapoint', () => {
        mockLead.measureVoltageValue = 0;
        mockTimeKeeper.elapsedMsValue = 0;
        leadDisplay.draw();

        const lineFromCount = mockRenderContext.drawLineFromValues.length;
        const lineToCount = mockRenderContext.drawLineToValues.length;
        expect(lineFromCount).to.equal(0);
        expect(lineToCount).to.equal(0);
    });

    it('should render line segments', () => {
        mockLead.measureVoltageValue = 0;
        mockTimeKeeper.elapsedMsValue = 0;
        leadDisplay.draw();

        mockTimeKeeper.elapsedMsValue = 1000;
        mockLead.measureVoltageValue = 1;
        leadDisplay.draw();

        const line1From = mockRenderContext.drawLineFromValues[0];
        const line1To = mockRenderContext.drawLineToValues[0];
        expect(line1From).to.deep.equal({x: 0, y: 150});
        expect(line1To).to.deep.equal({x: 100, y: 0});

        mockTimeKeeper.elapsedMsValue = 2000;
        mockLead.measureVoltageValue = -1;
        leadDisplay.draw();

        const line2From = mockRenderContext.drawLineFromValues[1];
        const line2To = mockRenderContext.drawLineToValues[1];
        expect(line2From).to.deep.equal({x: 100, y: 0});
        expect(line2To).to.deep.equal({x: 200, y: 300});
    });

    it('should clear rect ahead of last rendered line segment', () => {
        mockLead.measureVoltageValue = 0;
        mockTimeKeeper.elapsedMsValue = 0;
        leadDisplay.draw();

        mockTimeKeeper.elapsedMsValue = 1000;
        mockLead.measureVoltageValue = 1;
        leadDisplay.draw();

        const clearRectOrigin = mockRenderContext.clearRectOriginValues[0];
        const clearRectArea = mockRenderContext.clearRectAreaValues[0];
        expect(clearRectOrigin).to.deep.equal({x: 100, y: 0});
        expect(clearRectArea).to.deep.equal({width: 40, height: 300});
    });

    it('should wrap x coordinates', () => {
        mockLead.measureVoltageValue = 0;
        mockTimeKeeper.elapsedMsValue = 4000;
        leadDisplay.draw();

        mockLead.measureVoltageValue = 0;
        mockTimeKeeper.elapsedMsValue = 5000;
        leadDisplay.draw();

        mockLead.measureVoltageValue = 0;
        mockTimeKeeper.elapsedMsValue = 6000;
        leadDisplay.draw();

        mockLead.measureVoltageValue = 0;
        mockTimeKeeper.elapsedMsValue = 7000;
        leadDisplay.draw();

        const line1From = mockRenderContext.drawLineFromValues[0];
        const line1To = mockRenderContext.drawLineToValues[0];
        const line2From = mockRenderContext.drawLineFromValues[1];
        const line2To = mockRenderContext.drawLineToValues[1];

        expect(line2From.x).to.be.lessThan(line1From.x);
        expect(line2To.x).to.be.lessThan(line1To.x);
    });

    it('should normalize y coordinates', () => {
        mockLead.measureVoltageValue = 2;
        mockTimeKeeper.elapsedMsValue = 0;
        leadDisplay.draw();

        mockLead.measureVoltageValue = 2;
        mockTimeKeeper.elapsedMsValue = 1000;
        leadDisplay.draw();

        const lineFrom = mockRenderContext.drawLineFromValues[0];
        const lineTo = mockRenderContext.drawLineToValues[0];
        expect(lineFrom).to.deep.equal({x: 0, y: 0});
        expect(lineTo).to.deep.equal({x: 100, y: 0});
    });
});