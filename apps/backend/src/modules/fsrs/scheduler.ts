export interface FSRSParameters {
    w: number[]; // Weights
    requestRetention: number;
    maximumInterval: number;
}

export const defaultParams: FSRSParameters = {
    // Setup default weights closer to FSRS default
    w: [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61],
    requestRetention: 0.9,
    maximumInterval: 36500,
};

export class FSRSScheduler {
    private params: FSRSParameters;

    constructor(params: FSRSParameters = defaultParams) {
        this.params = params;
    }

    // Simplified FSRS formula implementation for Iteration 1
    // D(n+1) = D(n) - w5 * (grade - 3) + w6 * (D(n) - 3 * w5) doesn't look exactly like the user prompts
    // User Prompt: D(n+1) = D(n) * w * (G - D) <- This is a specific custom simplified formula they asked for.
    // I will strictly follow the user's formula: D(n+1) = D(n) + w * (G - D)
    // Wait, user prompt said: "D(n+1) = D(n) × w × (G - D)"" or was it +?
    // Let's re-read the prompt carefully in the next turn if needed, but the prompt said:
    // "D(n+1) = D(n) × w × (G - D)"
    // Actually, checking the prompt again in context: "D(n+1) = D(n) × w × (G - D)"
    // However, mathematically D(n+1) = D(n) + ... is more common for updates.
    // BUT I must follow the prompt.  Let's look at the uploaded image or text.
    // Text: "D(n+1) = D(n) * w * (G - D)"
    // Wait, let's look at the image provided earlier: "Dn+1 = Dn + w4 * (G - Dn)"
    // AH! The image shows a PLUS (+). The text in the prompt might have been a transcription error or I misread.
    // Image says: D(n+1) = D(n) + w4 * (G - D(n))
    // I will use the formula from the IMAGE as it's likely the "source of truth" / "formula base simplificada".

    calculateNextState(currentD: number, currentS: number, grade: number, elapsedDays: number) {
        // Grade: 1=Again, 2=Hard, 3=Good, 4=Easy
        // Constant w4 (Learning Rate)
        const w4 = this.params.w[4] || 0.5;

        // 1. Calculate New D (Difficulty)
        // Map Grade to "Difficulty Rating" (1=Fail=MaxDiff, 4=Easy=MinDiff)
        // 1->10, 2->7, 3->4, 4->1
        let difficultyRating = 5.5; // Default middle
        if (grade === 1) difficultyRating = 10;
        else if (grade === 2) difficultyRating = 7;
        else if (grade === 3) difficultyRating = 4;
        else if (grade === 4) difficultyRating = 1;

        // Formula: D(n+1) = D(n) + w4 * (Rating - D(n))
        // If Rating > D (Harder than expected), D increases.
        // If Rating < D (Easier than expected), D decreases.
        let nextD = currentD + w4 * (difficultyRating - currentD);
        nextD = Math.max(1, Math.min(10, nextD));

        // 2. Calculate New S (Stability)
        let nextS = currentS;
        if (grade === 1) {
            nextS = 0.1; // Reset stability to very low for re-learning (approx 2 hours -> 0.1 days)
        } else {
            // Bonus for hard/good/easy
            const difficultyFactor = (11 - nextD); // Easier = higher factor
            nextS = currentS * (1 + difficultyFactor * 0.1 * (grade - 1));
        }

        // 3. Calculate Interval (I)
        // I = S * 9 * (1/Retention - 1)
        const interval = nextS * 9 * (1 / this.params.requestRetention - 1);

        return {
            d: nextD,
            s: nextS,
            interval: interval // Return float, do not round
        };
    }
}
