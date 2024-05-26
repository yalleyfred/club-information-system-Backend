import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberDataAccessService {
  constructor(private prisma: PrismaService) {}

  public async getMember() {}
}
