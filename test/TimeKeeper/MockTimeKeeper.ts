import { TimeKeeper } from '../../src/TimeKeeper/TimeKeeper';

export class MockTimeKeeper implements TimeKeeper {
    private _startCalled: boolean = false;

    get startCalled(): boolean {
        return this._startCalled;
    }

    private _stopCalled: boolean = false;

    get stopCalled(): boolean {
        return this._stopCalled;
    }

    private _resetCalled: boolean = false;

    get resetCalled(): boolean {
        return this._resetCalled;
    }

    private _elapsedMsValue: number = 0;

    set elapsedMsValue(elapsedMsValue: number) {
        this._elapsedMsValue = elapsedMsValue;
    }

    public start() {
        this._startCalled = true;
    }

    public stop() {
        this._stopCalled = true;
    }

    public reset() {
        this._resetCalled = true;
    }

    public getElapsedMs(): number {
        return this._elapsedMsValue;
    }
}
