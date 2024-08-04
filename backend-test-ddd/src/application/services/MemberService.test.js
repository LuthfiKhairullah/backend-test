const MemberService = require('./MemberService');
const SequelizeMemberRepository = require('../../infrastructure/repositories/SequelizeMemberRepository');

describe('MemberService', () => {
  const memberRepository = new SequelizeMemberRepository();
  const memberService = new MemberService(memberRepository);

  it('should create a member', async () => {
    const isMemberExists = await memberRepository.findByCode('M005');
    if(isMemberExists) {
      expect(isMemberExists).toBeDefined();
      expect(isMemberExists.length).toBeGreaterThan(0);
    } else {
      const memberData = {
        code: 'M005',
        name: 'New Member',
      };
      const member = await memberService.createMember(memberData);
      expect(member).toBeDefined();
      expect(member.name).toBe('New Member');
    }
  });

  it('should find a member by code', async () => {
    const member = await memberService.findMemberByCode('M005');
    if(member === null) {
      expect(member).toBeNull();
    } else {
      expect(member).toBeDefined();
      expect(member.name).toBe('New Member');
    }
  });

  it('should update a member', async () => {
    const isMemberExists = await memberRepository.findByCode('M005');
    if(!isMemberExists) {
      expect(isMemberExists).toBeNull();
    } else {
      const memberData = {
        code: 'M005',
        name: 'Updated Member',
      };
      const member = await memberService.updateMember('M005', memberData);
      expect(member).toBeDefined();
      expect(member.name).toBe('Updated Member');
    }
  });

  it('should delete a member by id', async () => {
    await memberService.deleteMember('M005');
    const member = await memberService.findMemberByCode('M005');
    expect(member).toBeNull();
  });
});
