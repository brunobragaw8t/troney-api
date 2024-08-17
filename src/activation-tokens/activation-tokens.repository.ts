import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivationToken } from './aggregate/activation-token.entity';

@Injectable()
export class ActivationTokensRepository {
  constructor(
    @InjectRepository(ActivationToken)
    private readonly repo: Repository<ActivationToken>,
  ) {}

  /**
   * Create activation token
   *
   * @param userId Associated user's ID
   *
   * @returns Activation token on success, null on failure
   */
  async create(userId: string): Promise<ActivationToken | null> {
    const res = await this.repo.insert({ userId });

    if (res.identifiers.length === 0) {
      return null;
    }

    return await this.find(res.identifiers[0].id);
  }

  /**
   * Find activation token
   *
   * @param id Activation token's ID
   *
   * @returns Activation token on success, null on failure
   */
  async find(id: string): Promise<ActivationToken | null> {
    return await this.repo.findOneBy({ id });
  }
}
