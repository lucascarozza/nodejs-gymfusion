export class MaxDistanceExceededError extends Error {
  constructor() {
    super("Check-in failed: Gym location exceeds allowed distance.");
  }
}
