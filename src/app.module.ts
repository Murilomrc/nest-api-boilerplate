import { CacheModule, Module } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';

import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaHealthIndicator } from './common/customs/prismaHealthIndicator.custom';
import { IsUniqueConstraint } from './common/validators/isUnique.validator';
import { redisConfig } from './config/redis.condig';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    CacheModule.register<RedisClientOptions>(redisConfig),
    HealthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    //EnvalidModule.forRoot({ validators }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    IsUniqueConstraint,
    PrismaHealthIndicator,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
