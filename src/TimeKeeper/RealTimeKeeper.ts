import { Time } from './Time';
import { TimeKeeper } from './TimeKeeper';

export class RealTimeKeeper implements TimeKeeper {
    private startTimeMs: number;
    private currentTimeMs: number;

    constructor(private time: Time, private running = false) {
        this.startTimeMs = this.time.now();
        this.currentTimeMs = this.time.now();
    }

    public start(): void {
        this.running = true;
    }

    public stop(): void {
        this.running = false;
    }

    public reset(): void {
        this.startTimeMs = this.time.now();
        this.currentTimeMs = this.time.now();
    }

    public getElapsedMs(): number {
        const now = this.time.now();

        if (!this.running) {
            this.startTimeMs += now - this.currentTimeMs;
        }

        this.currentTimeMs = now;

        return this.currentTimeMs - this.startTimeMs;
    }
}
