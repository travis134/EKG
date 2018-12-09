import { Lead } from '../../src/Lead/Lead';

export class MockLead implements Lead {
    measureVoltage(): number {
        return 15;
    }
}
