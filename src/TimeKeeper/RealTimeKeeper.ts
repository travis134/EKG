import { TimeKeeper } from './TimeKeeper';

export class RealTimeKeeper implements TimeKeeper {
    private running: boolean;
    private startTimeMs: number;
    private currentTimeMs: number;

    constructor(private nowMs: () => number) {
        this.running = false;
        this.startTimeMs = this.nowMs();
        this.currentTimeMs = this.nowMs();
    }

    public start() {
        this.running = true;
    }

    public stop() {
        this.running = false;
    }

    public reset() {
        this.startTimeMs = this.nowMs();
        this.currentTimeMs = this.nowMs();
    }

    public getElapsedMs(): number {
        const now = this.nowMs();

        if (!this.running) {
            this.startTimeMs += now - this.currentTimeMs;
        }

        this.currentTimeMs = now;

        return this.currentTimeMs - this.startTimeMs;
    }
}
