export class CheckInLimitExceededError extends Error {
  constructor() {
    super("Check-in failed: Only one check-in is allowed per day.");
  }
}
