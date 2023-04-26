import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createWalletDto: CreateWalletDto,
    @Request() req: { user: UserDto },
  ) {
    return await this.walletsService.create(createWalletDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: { user: UserDto }) {
    return await this.walletsService.findAll(req.user);
  }
}
