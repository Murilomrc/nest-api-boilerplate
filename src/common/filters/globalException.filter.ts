import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseError } from '../exceptions/base.exception';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp(),
      req = ctx.getRequest(),
      res = ctx.getResponse();

    const data = {
      status: this.getStatus(exception),
      message: this.getMessage(exception),
      detail: exception.stack,
      path: req.url,
      timestamp: new Date().toISOString(),
      errors: this.getErrors(exception),
    };

    this.logger.error(
      `Http Status: ${data.status} Error Message: ${JSON.stringify(
        data.message,
      )}`,
    );

    return res
      .set({ 'Content-Type': 'application/problem+json' })
      .status(data.status)
      .json(this.buildErrorResponse(data, 'problemDetails'));
  }

  getStatus(exception: unknown) {
    if (exception instanceof HttpException) return exception.getStatus();
    if (exception instanceof BaseError) return exception.statusCode;
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  getMessage(exception: unknown) {
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'object') return (res as any).error;
      return res;
    }
    if (exception instanceof Error) return exception.message;
    return exception;
  }

  getErrors(exception: unknown) {
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'object') return (res as any).message;
      return res;
    }
    if (exception instanceof BaseError) return exception.errors;
    return null;
  }

  buildErrorResponse(data, type: 'default' | 'problemDetails' = 'default') {
    const hasErrors = Array.isArray(data.errors) && data.errors.length;
    if (type === 'problemDetails')
      return {
        title: data.message,
        status: data.status,
        detail: data.detail,
        instance: data.path,
        ...(hasErrors && {
          errors: this.mapError(data.errors),
        }),
      };
    return {
      message: data.message,
      timestamp: data.timestamp,
      path: data.path,
      detail: data.detail,
      ...(hasErrors && { errors: this.mapError(data.errors) }),
    };
  }

  mapError(errors) {
    return errors.map((error) => ({
      field: error.property,
      errors: Object.values(error.constraints),
    }));
  }
}
