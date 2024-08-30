import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResetToken } from './aggregate/reset-token.entity';

@Injectable()
export class ResetTokensRepository {
  constructor(
    @InjectRepository(ResetToken)
    private readonly repo: Repository<ResetToken>,
  ) {}

  /**
   * Create reset token
   *
   * @param userId Associated user's ID
   *
   * @returns Reset token on success, null on failure
   */
  async create(userId: string): Promise<ResetToken | null> {
    const res = await this.repo.insert({ userId });

    if (res.identifiers.length === 0) {
      return null;
    }

    return await this.find(res.identifiers[0].id);
  }

  /**
   * Find reset token
   *
   * @param id Reset token's ID
   *
   * @returns Reset token on success, null on failure
   */
  async find(id: string): Promise<ResetToken | null> {
    return await this.repo.findOneBy({ id });
  }

  /**
   * Find reset token by user ID
   *
   * @param userId Associated user's ID
   *
   * @returns Reset token on success, null on failure
   */
  async findByUser(userId: string): Promise<ResetToken | null> {
    return await this.repo.findOneBy({ userId });
  }
}
