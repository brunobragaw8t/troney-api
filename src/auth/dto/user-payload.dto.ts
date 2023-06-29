export class UserPayloadDto {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
  ) {}
}
