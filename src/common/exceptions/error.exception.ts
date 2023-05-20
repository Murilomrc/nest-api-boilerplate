import { ValidationError } from 'class-validator';
import { HttpStatusCode } from '../enums/httpStatus.enum';
import { BaseError } from './base.exception';
import { HttpStatusMessage } from './message.exception';

export class InternalServerError extends BaseError {
  constructor(
    message = HttpStatusMessage.INTERNAL_SERVER,
    errors?: string[] | ValidationError[],
  ) {
    super(message, errors);
    this.name = this.constructor.name;
    this.statusCode = HttpStatusCode.INTERNAL_SERVER;
  }
}

export class BadRequestError extends BaseError {
  constructor(
    message = HttpStatusMessage.BAD_REQUEST,
    errors?: string[] | ValidationError[],
  ) {
    super(message, errors);
    this.name = this.constructor.name;
    this.statusCode = HttpStatusCode.BAD_REQUEST;
  }
}

export class UserInactivatedError extends BaseError {
  constructor(message = HttpStatusMessage.USER_INACTIVATED) {
    super(message);
    this.statusCode = HttpStatusCode.FORBIDDEN;
  }
}

export class InvalidTokenError extends BaseError {
  constructor(message = HttpStatusMessage.INVALID_TOKEN) {
    super(message);
    this.statusCode = HttpStatusCode.UNAUTHORIZED;
  }
}

export class LoginRequiredError extends BaseError {
  constructor(message = HttpStatusMessage.LOGIN_REQUIRED) {
    super(message);
    this.statusCode = HttpStatusCode.UNAUTHORIZED;
  }
}

export class PermissionDeniedError extends BaseError {
  constructor(message = HttpStatusMessage.PERMISSION_DENIED) {
    super(message);
    this.statusCode = HttpStatusCode.UNAUTHORIZED;
  }
}

export class UserNotFoundError extends BaseError {
  constructor(message = HttpStatusMessage.USER_NOT_FOUND) {
    super(message);
    this.statusCode = HttpStatusCode.NOT_FOUND;
  }
}

export class InvalidCredentialsError extends BaseError {
  constructor(message = HttpStatusMessage.INVALID_CREDENTIALS) {
    super(message);
    this.statusCode = HttpStatusCode.UNAUTHORIZED;
  }
}

export class EntityNotFoundError extends BaseError {
  constructor(message = HttpStatusMessage.ENTITY_NOT_FOUND) {
    super(message);
    this.statusCode = HttpStatusCode.NOT_FOUND;
  }
}
