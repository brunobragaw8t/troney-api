export class CreateWalletCommand {
  constructor(
    public readonly name: string,
    public readonly startingBalance: number,
    public readonly user: string,
  ) {}
}
