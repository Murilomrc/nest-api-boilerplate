import { ControllerOptions, VERSION_NEUTRAL } from '@nestjs/common';

export const versionConfig = {
  user: {
    path: 'users',
    version: [VERSION_NEUTRAL, '1'],
  } as ControllerOptions,
};
