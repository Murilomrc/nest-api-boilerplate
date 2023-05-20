import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

export const redisConfig = {
  isGlobal: true,
  store: redisStore,
  url: 'redis://localhost:6379',
} as RedisClientOptions;
