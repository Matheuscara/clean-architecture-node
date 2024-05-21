export class NotFoundError extends Error {
    public readonly status: number;
    public readonly error: string | null;
  
    constructor(message: string = "Resource not found", error: string | null = null) {
      super(message);
      this.status = 404;
      this.error = error;
  
      Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
