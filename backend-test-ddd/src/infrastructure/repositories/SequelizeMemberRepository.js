const MemberRepository = require('../../domain/repositories/MemberRepository');
const MemberModel = require('../orm/MemberModel');
const Member = require('../../domain/entities/Member');

class SequelizeMemberRepository extends MemberRepository {
  async findAllMember() {
    const memberData = await MemberModel.findAll();
    if (!memberData) return null;
    return memberData;
  }

  async findByCode(code) {
    const memberData = await MemberModel.findByPk(code);
    if (!memberData) return null;
    return memberData;
  }

  async save(member) {
    const memberData = await MemberModel.create(member);
    return memberData;
  }

  async update(member) {
    await MemberModel.update({
      name: member.name,
      penalty_date: member.penalty_date,
      book_borrowed: member.book_borrowed,
    }, { where: { code: member.code } });
    return member;
  }

  async delete(code) {
    await MemberModel.destroy({ where: { code: code } });
  }
}

module.exports = SequelizeMemberRepository;
