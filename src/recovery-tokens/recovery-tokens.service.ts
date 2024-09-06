import { Injectable } from '@nestjs/common';
import { RecoveryTokenResponseDto } from './dto/common/recovery-token-response.dto';
import { RecoveryToken } from './aggregate/recovery-token.entity';

@Injectable()
export class RecoveryTokensService {
  /**
   * Map RecoveryToken entity to response DTO
   *
   * @param token RecoveryToken entity
   * @param link Recovery link
   *
   * @returns Recovery token's response DTO
   */
  mapToResponseDto(
    token: RecoveryToken,
    link: string,
  ): RecoveryTokenResponseDto {
    return {
      id: token.id,
      userId: token.userId,
      createdAt: token.createdAt,
      link,
    };
  }

  /**
   * Form reset link
   *
   * @param tokenId Recovery token ID
   * @param frontendBaseUrl Frontend base URL
   *
   * @returns Reset link
   */
  formLink(tokenId: string, frontendBaseUrl: string): string {
    return `${frontendBaseUrl}/reset?t=${tokenId}`;
  }
}
