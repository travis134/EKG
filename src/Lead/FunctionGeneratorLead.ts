import { Lead } from './Lead';
import { TimeKeeper } from '../TimeKeeper/TimeKeeper';

export class FunctionGeneratorLead implements Lead {
    constructor(
        private fn: (x: number) => number,
        private timeScale: number,
        private timeKeeper: TimeKeeper
    ) {}

    public measureVoltage(): number {
        const elapsedMs = this.timeKeeper.getElapsedMs();
        return this.fn(elapsedMs * this.timeScale);
    }
}
