import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDropedMemberDto, EditDropedMemberDto } from './dto/droped-member.dto';
import { DropedMember } from 'prisma';
import { DropedMemberDataAcessService } from './droped-member-data-access.service';

@Injectable()
export class DropedMemberService {
  constructor(private readonly dropedMmemberDataAccessService: DropedMemberDataAcessService) {}

  public async createDropedMember(userId: number, dto: CreateDropedMemberDto) {
    try {
      const { memberId } = dto;
      const alreadyDropped: DropedMember =
        await this.dropedMmemberDataAccessService.getDropedMemberByDropedId(userId, memberId);

      if (alreadyDropped) throw new HttpException('Member has already been dropped!', 400);

      await this.dropedMmemberDataAccessService.setMemberToDroped(memberId);

      return await this.dropedMmemberDataAccessService.createDropedMember(userId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async getDropedMembers(userId: number) {
    try {
      return await this.dropedMmemberDataAccessService.getAllDropedMembers(userId);
    } catch (error) {
      throw error;
    }
  }

  public async getDropedMemberById(userId: number, dropedId: number) {
    try {
      const alreadyDropped: DropedMember =
        await this.dropedMmemberDataAccessService.getDropedMemberByDropedId(userId, dropedId);

      if (!alreadyDropped) throw new NotFoundException();

      return alreadyDropped;
    } catch (error) {
      throw error;
    }
  }

  public async updateDropedMember(userId: number, dropedId: number, dto: EditDropedMemberDto) {
    try {
      const { activatedDate } = dto;
      const alreadyDropped: DropedMember =
        await this.dropedMmemberDataAccessService.getDropedMemberByDropedId(userId, dropedId);

      if (!alreadyDropped) throw new NotFoundException();

      if (activatedDate)
        await this.dropedMmemberDataAccessService.setMemberToActive(alreadyDropped.memberId);

      return await this.dropedMmemberDataAccessService.updateDropedMember(dropedId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async removeDropedMember(userId: number, dropedId: number) {
    try {
      const alreadyDropped: DropedMember =
        await this.dropedMmemberDataAccessService.getDropedMemberByDropedId(userId, dropedId);

      if (!alreadyDropped) throw new NotFoundException();

      return await this.dropedMmemberDataAccessService.removeDropedMember(userId, new Date());
    } catch (error) {
      throw error;
    }
  }
}
