import { TimeKeeper } from './TimeKeeper/TimeKeeper';
import { Lead } from './Lead/Lead';
import { RenderContext, Area } from './RenderContext/RenderContext';
import { GridDisplay } from './Display/GridDisplay';
import { LeadDisplay } from './Display/LeadDisplay';

export class Monitor {
    private gridDisplay: GridDisplay;
    private leadDisplay: LeadDisplay;

    constructor(
        private lead: Lead,
        private timeKeeper: TimeKeeper,
        private gridRenderContext: RenderContext,
        private leadRenderContext: RenderContext,
        private area: Area
    ) {
        this.gridDisplay = new GridDisplay(this.gridRenderContext, this.area);
        this.leadDisplay = new LeadDisplay(
            this.leadRenderContext,
            this.area,
            this.lead,
            this.timeKeeper
        );
    }

    public turnOn() {
        this.timeKeeper.start();
        this.gridDisplay.draw();
    }

    public turnOff() {
        this.timeKeeper.stop();
        this.gridDisplay.clear();
        this.leadDisplay.clear();
    }

    public tick() {
        this.leadDisplay.draw();
    }
}
