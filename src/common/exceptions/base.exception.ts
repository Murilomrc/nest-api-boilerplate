import { ValidationError } from 'class-validator';

export class BaseError extends Error {
  public name = 'Error';
  public statusCode: number;
  public errors: string[] | any | ValidationError[] = [];
  public isOperational = true;

  constructor(message: string, errors?: string[] | ValidationError[]) {
    super(<string>message);
    this.name = this.name || this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
    if (errors) {
      if (typeof errors[0] === 'string') {
        this.errors = errors as string[];
      } else if (errors[0] instanceof ValidationError) {
        this.errors = errors.map((error) => ({
          [error.property]: {
            value: error.value,
            errors: Object.values(error.constraints),
          },
        }));
      }
    }
  }
}
