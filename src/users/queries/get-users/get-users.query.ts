import { FindAllUsersFilter } from 'src/users/types/find-all-users-filter.type';

export class GetUsersQuery {
  constructor(public readonly filter?: FindAllUsersFilter) {}
}
