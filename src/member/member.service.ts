import { Injectable } from '@nestjs/common';
import { createMemberDto, EditMemberDto } from 'src/member/dto/member.dto';
import { MemberDataAccessService } from './member-data-access.service';

@Injectable()
export class MemberService {
  constructor(private readonly memberDataAccessService: MemberDataAccessService) {}

  public async createMember(dto: createMemberDto, userId: number) {
    try {
      return await this.memberDataAccessService.createMember(userId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async getMembers(userId: number) {
    try {
      return await this.memberDataAccessService.getAllMember(userId);
    } catch (error) {
      throw error;
    }
  }

  public async getMember(userId: number, memberId: number) {
    try {
      return await this.memberDataAccessService.getMember(userId, memberId);
    } catch (error) {
      throw error;
    }
  }

  public async editMember(userId: number, memberId: number, dto: EditMemberDto) {
    try {
      return await this.memberDataAccessService.updateMember(userId, memberId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async dropMember(userId: number, memberId: number) {
    try {
      return await this.memberDataAccessService.removeMember(userId, memberId);
    } catch (error) {
      throw error;
    }
  }
}
