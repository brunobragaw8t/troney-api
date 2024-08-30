import { Injectable } from '@nestjs/common';
import { ResetTokenResponseDto } from './dto/common/reset-token-response.dto';
import { ResetToken } from './aggregate/reset-token.entity';

@Injectable()
export class ResetTokensService {
  /**
   * Map ResetToken entity to response DTO
   *
   * @param token ResetToken entity
   * @param link Reset link
   *
   * @returns Reset token's response DTO
   */
  mapToResponseDto(token: ResetToken, link: string): ResetTokenResponseDto {
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
   * @param tokenId Reset token ID
   * @param frontendBaseUrl Frontend base URL
   *
   * @returns Reset link
   */
  formLink(tokenId: string, frontendBaseUrl: string): string {
    return `${frontendBaseUrl}/reset?t=${tokenId}`;
  }
}
