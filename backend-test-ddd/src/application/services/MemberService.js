const Member = require("../../domain/entities/Member");

class MemberService {
  constructor(memberRepository) {
    this.memberRepository = memberRepository;
  }

  async findAllMember() {
    return await this.memberRepository.findAllMember();
  }

  async findMemberByCode(code) {
    return await this.memberRepository.findByCode(code);
  }

  async createMember(memberData) {
    const member = new Member(memberData.code, memberData.name);
    return await this.memberRepository.save(member);
  }

  async updateMember(code, memberData) {
    const member = await this.memberRepository.findByCode(code);
    if(memberData.name != null) member.name = memberData.name;
    if(memberData.penalty_date != null) member.penalty_date = memberData.penalty_date;
    if(memberData.book_borrowed != null) member.book_borrowed = memberData.book_borrowed;
    
    return await this.memberRepository.update(member);
  }

  async deleteMember(code) {
    return await this.memberRepository.delete(code);
  }
}

module.exports = MemberService;
