const MemberService = require('../services/MemberService');
const SequelizeMemberRepository = require('../../infrastructure/repositories/SequelizeMemberRepository');

const memberRepository = new SequelizeMemberRepository();
const memberService = new MemberService(memberRepository);

class MemberController {
  static async getAllMember(req, res) {
    try {
      const member = await memberService.findAllMember();

      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find members'
        });
      }

      res.status(201).json({
        success: true,
        data: member
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  static async getMember(req, res) {
    try {
      const { code } = req.params;
      const member = await memberService.findMemberByCode(code);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find member'
        });
      }
      res.status(201).json({
        success: true,
        data: member
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  static async createMember(req, res) {
    try {
      const {
        code,
        name,
      } = req.body;

      const isMemberExists = await memberService.findMemberByCode(code);
      if (isMemberExists) {
        return res.status(404).json({
          success: false,
          message: 'Member is already exists'
        });
      }

      const data = {
        code: code,
        name: name,
      }

      const member = await memberService.createMember(data);
      res.status(201).json({
        success: true,
        message: 'Created member successfully',
        data: member
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  static async updateMember(req, res) {
    try {
      const { code } = req.params;
      const {
        name,
        penalty_date,
        book_borrowed,
      } = req.body;

      const member = await memberService.findMemberByCode(code);
      
      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find member'
        });
      }

      const data = {
        name: name,
        penalty_date: penalty_date,
        book_borrowed: book_borrowed,
      }

      const update_member = await memberService.updateMember(code, data);
      res.status(201).json({
        success: true,
        message: 'Updated member successfully',
        data: update_member
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  static async deleteMember(req, res) {
    try {
      const { code } = req.params;
      const member = await memberService.findMemberByCode(code);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find member'
        });
      }
      await memberService.deleteMember(code);
      res.status(201).json({
        success: true,
        message: 'Deleted member successfully'
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports = MemberController;
