import {
  Controller,
  Post,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('admin-account')
  public createAdminAccount(
    @GetUser('id') userId: number,
    @Query('year') year: string,
  ) {
    return this.accountService.createAdminAccount(userId, year);
  }

  @Post('public-account')
  public createPublicAccount(
    @GetUser('id') userId: number,
    @Query('year') year: string,
  ) {
    return this.accountService.createPublicAccount(userId, year);
  }

  @Post('member-account')
  public createMemberAccountReport(
    @GetUser('id') userId: number,
    @Query('id', ParseIntPipe) memberId: number,
    @Query('year') year: string,
  ) {
    return this.accountService.createMemberAccountReport(
      userId,
      memberId,
      year,
    );
  }
}
