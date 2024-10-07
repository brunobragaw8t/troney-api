import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './aggregate/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletsRepository {
  constructor(
    @InjectRepository(Wallet) private readonly repo: Repository<Wallet>,
  ) {}

  /**
   * Create wallet
   *
   * @param userId Associated user's ID
   * @param name Wallet's name
   * @param balance Wallet's initial balance
   *
   * @returns Wallet on success, null on failure
   */
  async create(
    userId: string,
    name: string,
    balance: number,
  ): Promise<Wallet | null> {
    const res = await this.repo.insert({ userId, name, balance });

    if (res.identifiers.length === 0) {
      return null;
    }

    return await this.find(res.identifiers[0].id);
  }

  /**
   * Find wallet
   *
   * @param id Wallet's ID
   *
   * @returns Wallet on success, null on failure
   */
  async find(id: string): Promise<Wallet | null> {
    return await this.repo.findOneBy({ id });
  }
}
