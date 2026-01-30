import { FSRSScheduler } from '../modules/fsrs/scheduler';

describe('FSRS Scheduler', () => {
    let scheduler: FSRSScheduler;

    beforeEach(() => {
        scheduler = new FSRSScheduler();
    });

    test('should calculate next difficulty correctly', () => {
        const currentD = 2.5;
        const currentS = 1.0;
        const grade = 3;

        const result = scheduler.calculateNextState(currentD, currentS, grade, 1);

        expect(result.d).toBeDefined();
        expect(result.s).toBeDefined();
        expect(result.interval).toBeGreaterThan(0);
    });
});
