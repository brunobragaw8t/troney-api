import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Wallet } from 'src/wallets/entities/wallet.entity';
import { WalletsRepository } from 'src/wallets/wallets.repository';
import { GetWalletQuery } from './get-wallet.query';

@QueryHandler(GetWalletQuery)
export class GetWalletHandler implements IQueryHandler<GetWalletQuery> {
  constructor(private readonly walletsRepository: WalletsRepository) {}

  async execute(query: GetWalletQuery): Promise<Wallet> {
    const wallet = await this.walletsRepository.find(query);

    if (!wallet) {
      throw new NotFoundException(`Wallet ${query.id} not found.`);
    }

    return wallet;
  }
}
