import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserFilter } from 'src/core/users/models/user.model';

export const UserFilterDecor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { query } = request;
    const filter: UserFilter = {
      fullName: query.fullName,
      fromDate: query.fromDate,
      toDate: query.toDate,
    };

    return filter;
  },
);
