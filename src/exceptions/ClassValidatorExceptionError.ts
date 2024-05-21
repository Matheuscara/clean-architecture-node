export class ClassValidatorExceptionError extends Error {
    public readonly status: number;
    public readonly error: string | null;
  
    constructor(message: string, status: number, error: string | null = null) {
      super(message);
      this.status = status;
      this.error = error;
  
      Object.setPrototypeOf(this, ClassValidatorExceptionError.prototype);
    }
  }
  