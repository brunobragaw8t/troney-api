export class SetUserPasswordCommand {
  constructor(
    public readonly id: string,
    public readonly password: string,
  ) {}
}
