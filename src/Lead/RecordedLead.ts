import { Lead } from './Lead';
import { TimeKeeper } from '../TimeKeeper/TimeKeeper';

export class RecordedLead implements Lead {
    constructor(
        private samples: number[],
        private sampleRateHz: number,
        private timeKeeper: TimeKeeper
    ) {}

    public measureVoltage(): number {
        const sampleIndex = this.getSampleIndex();

        if (sampleIndex >= this.samples.length) {
            throw new Error('End of recording reached.');
        }

        return this.samples[sampleIndex];
    }

    private getSampleIndex(): number {
        const elapsedMs = this.timeKeeper.getElapsedMs();
        return Math.floor((elapsedMs / 1000) * this.sampleRateHz);
    }
}
