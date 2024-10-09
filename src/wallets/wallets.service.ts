import { Injectable } from '@nestjs/common';
import { Wallet } from './aggregate/wallet.entity';
import { WalletResponseDto } from './dto/common/wallet-response.dto';

@Injectable()
export class WalletsService {
  /**
   * Map Wallet entity to response DTO
   *
   * @param wallet Wallet entity
   *
   * @returns Wallet's response DTO
   */
  mapToResponseDto(wallet: Wallet): WalletResponseDto {
    return {
      id: wallet.id,
      name: wallet.name,
      balance: wallet.balance,
      createdAt: wallet.createdAt,
    };
  }
}
