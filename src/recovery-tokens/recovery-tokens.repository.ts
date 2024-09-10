import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecoveryToken } from './aggregate/recovery-token.entity';

@Injectable()
export class RecoveryTokensRepository {
  constructor(
    @InjectRepository(RecoveryToken)
    private readonly repo: Repository<RecoveryToken>,
  ) {}

  /**
   * Create recovery token
   *
   * @param userId Associated user's ID
   *
   * @returns Recovery token on success, null on failure
   */
  async create(userId: string): Promise<RecoveryToken | null> {
    const res = await this.repo.insert({ userId });

    if (res.identifiers.length === 0) {
      return null;
    }

    return await this.find(res.identifiers[0].id);
  }

  /**
   * Find recovery token
   *
   * @param id Recovery token's ID
   *
   * @returns Recovery token on success, null on failure
   */
  async find(id: string): Promise<RecoveryToken | null> {
    return await this.repo.findOneBy({ id });
  }

  /**
   * Find recovery token by user ID
   *
   * @param userId Associated user's ID
   *
   * @returns Recovery token on success, null on failure
   */
  async findByUser(userId: string): Promise<RecoveryToken | null> {
    return await this.repo.findOneBy({ userId });
  }

  /**
   * Delete token
   *
   * @param id ID
   *
   * @returns Recovery token on success, null on failure
   */
  async delete(id: string): Promise<RecoveryToken | null> {
    const item = await this.find(id);

    if (item === null) {
      return null;
    }

    const res = await this.repo.delete(id);

    if (!res.affected) {
      return null;
    }

    return item;
  }
}
