import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Request,
  UseGuards,
  HttpCode,
  Param,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { CreateWalletResponseDto } from './commands/create-wallet/create-wallet-response.dto';
import { CreateWalletCommand } from './commands/create-wallet/create-wallet.command';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { GetWalletQueryDto } from './dto/get-wallet-query.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletsService } from './wallets.service';

@ApiTags('Wallets')
@ApiBearerAuth()
@Controller('wallets')
@UseGuards(AuthGuard)
export class WalletsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly walletsService: WalletsService,
  ) {}

  @ApiOperation({ summary: 'Create a wallet' })
  @ApiUnauthorizedResponse({ description: 'Invalid authorization' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @Post()
  async create(
    @Body() body: CreateWalletDto,
    @Request() req: { user: UserPayloadDto },
  ): Promise<CreateWalletResponseDto> {
    return await this.commandBus.execute<
      CreateWalletCommand,
      CreateWalletResponseDto
    >(new CreateWalletCommand(body.name, body.startingBalance, req.user.id));
  }

  @ApiOperation({ summary: 'Get a wallet' })
  @ApiUnauthorizedResponse({ description: 'Invalid authorization' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Wallet not found' })
  @Get(':id')
  async find(
    @Param() params: GetWalletQueryDto,
    @Request() req: { user: UserPayloadDto },
  ) {
    return await this.walletsService.find(params.id, req.user);
  }

  @Get()
  async findAll(@Request() req: { user: UserPayloadDto }) {
    return await this.walletsService.findAll(req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
    @Request() req: { user: UserPayloadDto },
  ) {
    const wallet = await this.walletsService.find(id, req.user);

    if (!wallet) {
      throw new NotFoundException();
    }

    return await this.walletsService.update(id, updateWalletDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Request() req: { user: UserPayloadDto },
  ) {
    const wallet = await this.walletsService.find(id, req.user);

    if (!wallet) {
      throw new NotFoundException();
    }

    return await this.walletsService.delete(id);
  }
}
