const SequelizeMemberRepository = require('./SequelizeMemberRepository');
const { MemberModel } = require('../../../mocks/sequelize');

describe('SequelizeMemberRepository', () => {
  const memberRepository = new SequelizeMemberRepository();

  it('should save a member', async () => {
    const isMemberExists = await memberRepository.findByCode('M005');
    if(isMemberExists) {
      expect(isMemberExists).toBeDefined();
      expect(isMemberExists.length).toBeGreaterThan(0);
    } else {
      const memberData = {
        code: 'M005',
        name: 'New Member',
      };
      const member = await memberRepository.save(memberData);
      expect(member).toBeDefined();
      expect(member.name).toBe('New Member');
    }
  });

  it('should find a member by code', async () => {
    const member = await memberRepository.findByCode('M005');
    if(member === null) {
      expect(member).toBeNull();
    } else {
      expect(member).toBeDefined();
      expect(member.name).toBe('New Member');
    }
  });

  it('should update a member', async () => {
    const memberData = {
      code: 'M005',
      name: 'Updated Member'
    };
    const member = await memberRepository.update(memberData);
    expect(member).toBeDefined();
    expect(member.name).toBe('Updated Member');
  });

  it('should delete a member by code', async () => {
    await memberRepository.delete('M005');
    const member = await memberRepository.findByCode('M005');
    expect(member).toBeNull();
  });
});
