export class UpdateUserDto {
  constructor(
    public readonly email?: string,
    public readonly password?: string,
    public readonly name?: string,
    public readonly activatedAt?: Date | null,
  ) {}
}
