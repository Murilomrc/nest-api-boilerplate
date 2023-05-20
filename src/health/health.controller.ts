import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from 'src/common/customs/prismaHealthIndicator.custom';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('api', 'http://localhost:3000'),
    ]);
  }

  @Get('database')
  @HealthCheck()
  checkDatabase() {
    return this.health.check([() => this.db.pingCheck('prisma')]);
  }
}
