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
import { AuthGuard } from 'src/auth/auth.guard';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
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

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
    @Request() req: { user: UserDto },
  ) {
    const wallet = await this.walletsService.find(id, req.user);

    if (!wallet) {
      throw new NotFoundException();
    }

    return await this.walletsService.update(id, updateWalletDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: { user: UserDto }) {
    const wallet = await this.walletsService.find(id, req.user);

    if (!wallet) {
      throw new NotFoundException();
    }

    return await this.walletsService.delete(id);
  }
}
