import { Injectable } from '@nestjs/common';
import { ActivationTokenResponseDto } from './dto/common/activation-token-response.dto';
import { ActivationToken } from './aggregate/activation-token.entity';

@Injectable()
export class ActivationTokensService {
  /**
   * Map ActivationToken entity to response DTO
   *
   * @param activationToken ActivationToken entity
   *
   * @returns Activation token's response DTO
   */
  mapToResponseDto(
    activationToken: ActivationToken,
  ): ActivationTokenResponseDto {
    return {
      id: activationToken.id,
      userId: activationToken.userId,
      createdAt: activationToken.createdAt,
    };
  }
}
