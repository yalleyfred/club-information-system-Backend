import { Controller, Param, Post, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('account')
export class AccountController {
    constructor(private readonly AccountService: AccountService) {}

    @Post('admin-account')
    createAdminAccount(@GetUser('id') userId:number, @Query('year') year: string) {
        return this.AccountService.createAdminAccount(userId, year);
    }

    @Post('public-account')
    createPublicAccount(@GetUser('id') userId:number,  @Query('year') year: string) {
        return this.AccountService.createPublicAccount(userId, year);
    }

    @Post('member-account')
    createMemberAccountReport(@GetUser('id') userId:number, @Query('id', ParseIntPipe) memberId:number, @Query('year') year: string) {
        return this.AccountService.createMemberAccountReport(userId, memberId, year);
    }
}
