import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletsRepository } from 'src/wallets/wallets.repository';
import { CreateWalletCommand } from './create-wallet.command';
import { CreateWalletResponseDto } from './create-wallet.response';

@CommandHandler(CreateWalletCommand)
export class CreateWalletHandler
  implements ICommandHandler<CreateWalletCommand>
{
  constructor(private readonly walletsRepository: WalletsRepository) {}

  async execute(
    command: CreateWalletCommand,
  ): Promise<CreateWalletResponseDto> {
    const wallet = await this.walletsRepository.create(command);

    return {
      id: wallet.id,
      name: wallet.name,
      startingBalance: wallet.startingBalance,
    };
  }
}
