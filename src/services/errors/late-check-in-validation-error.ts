export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      "Check-in validation failed: You must validate within 20 minutes of check-in."
    );
  }
}
