export class CreateWalletCommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly balance: number,
  ) {}
}
