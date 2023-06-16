export class RegisterUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly repassword: string,
    public readonly name: string,
  ) {}
}
