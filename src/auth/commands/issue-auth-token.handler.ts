import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IssueAuthTokenCommand } from './issue-auth-token.command';
import { AuthService } from '../auth.service';
import { IssueAuthTokenResponseDto } from '../dto/issue-auth-token/issue-auth-token-response.dto';

@Injectable()
@CommandHandler(IssueAuthTokenCommand)
export class IssueAuthTokenHandler
  implements ICommandHandler<IssueAuthTokenCommand, IssueAuthTokenResponseDto>
{
  constructor(private readonly service: AuthService) {}

  async execute(
    command: IssueAuthTokenCommand,
  ): Promise<IssueAuthTokenResponseDto> {
    const token = await this.service.issueToken(command.user);

    return {
      token: token,
    };
  }
}
