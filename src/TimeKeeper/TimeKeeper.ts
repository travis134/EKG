export interface TimeKeeper {
    start(): void;
    stop(): void;
    reset(): void;
    getElapsedMs(): number;
}
