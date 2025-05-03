export class UserAlreadyExistsError extends Error {
  constructor() {
    super("Emal address already in use");
  }
}
