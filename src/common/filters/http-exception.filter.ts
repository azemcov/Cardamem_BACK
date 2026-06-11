import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus();
    const res = exception.getResponse();

    response.status(status).json({
      message: typeof res === 'string' ? res : (res as any).message ?? null,
      code: (res as any)?.code ?? null,
      fields: (res as any)?.fields ?? null,
    });
  }
}
