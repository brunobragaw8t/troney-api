import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Wallet } from 'src/wallets/entities/wallet.entity';
import { WalletsRepository } from 'src/wallets/wallets.repository';
import { GetWalletsQuery } from './get-wallets.query';

@QueryHandler(GetWalletsQuery)
export class GetWalletsHandler implements IQueryHandler<GetWalletsQuery> {
  constructor(private readonly walletsRepository: WalletsRepository) {}

  async execute(query: GetWalletsQuery): Promise<Wallet[]> {
    return await this.walletsRepository.findAll(query);
  }
}
