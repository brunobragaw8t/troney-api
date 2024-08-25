export class GetUserByCredentialsQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
