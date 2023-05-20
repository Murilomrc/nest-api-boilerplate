import { makeValidators, num, Static } from 'nestjs-envalid';

export const validators = makeValidators({
  PORT: num({ default: 3000 }),
});

export const nestEnvConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
  },
});

export type Config = Static<typeof validators>;
