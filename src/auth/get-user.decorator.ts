import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExecuteDbAdminCommandOptions } from 'typeorm';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
