import { Controller, UseGuards, Post, Patch, Get, Delete, Body, ParseIntPipe, Param, Query } from '@nestjs/common';
import { DuesService } from './dues.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { CreateDuesDto, EditDuesDto } from './dto/dues.dto';

@UseGuards(JwtGuard)
@Controller('dues')
export class DuesController {
    constructor(private readonly duesService: DuesService) {}

    @Post()
    createDues(@GetUser('id') userId:number, @Body() dto: CreateDuesDto) {
        return this.duesService.createDues(userId, dto)
    }

    @Get()
    getDues(@GetUser('id') userId:number) {
        return this.duesService.getDues(userId)
    }

    @Get(':id')
    getDuesById(@GetUser('id') userId:number, @Param('id', ParseIntPipe) duesId:number) {
        return this.duesService.getDuesById(userId, duesId)
    }

    @Patch(':id') 
    updateDues(@GetUser('id') userId:number, @Param('id', ParseIntPipe) duesId:number, @Body() dto: EditDuesDto) {
        return this.duesService.updateDues(userId, duesId, dto)
    }

    @Delete(':id') 
    removeDues(@GetUser('id') userId:number, @Param('id', ParseIntPipe) duesId:number) {
        return this.duesService.removeDues(userId, duesId)
    }
}

