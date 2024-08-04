const RecordService = require('../services/RecordService');
const SequelizeRecordRepository = require('../../infrastructure/repositories/SequelizeRecordRepository');
const MemberService = require('../services/MemberService');
const SequelizeMemberRepository = require('../../infrastructure/repositories/SequelizeMemberRepository');
const BookService = require('../services/BookService');
const SequelizeBookRepository = require('../../infrastructure/repositories/SequelizeBookRepository');

const recordRepository = new SequelizeRecordRepository();
const recordService = new RecordService(recordRepository);
const memberRepository = new SequelizeMemberRepository();
const memberService = new MemberService(memberRepository);
const bookRepository = new SequelizeBookRepository();
const bookService = new BookService(bookRepository);

class RecordController {
  static async getAllRecord(req, res) {
    try {
      const record = await recordService.findAllRecord();

      if (!record) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find records'
        });
      }

      res.status(201).json({
        success: true,
        data: record
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  static async getRecord(req, res) {
    try {
      const { id } = req.params;
      const record = await recordService.findRecordByCode(id);
      if (!record) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find record'
        });
      }
      res.status(201).json({
        success: true,
        data: record
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  static async borrowBook(req, res) {
    try {
      const { member_code, book_code } = req.params;
      const now = new Date();

      const member = await memberService.findMemberByCode(member_code);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find member'
        });
      } else if (member.penalty_date >= now) {
        return res.status(404).json({
          success: false,
          message: `Member is under penalty until ${member.penalty_date}`
        });
      } else if (member.book_borrowed >= 2) {
        return res.status(404).json({
          success: false,
          message: 'Member cannot borrow more than 2 books.'
        });
      }

      const book = await bookService.findBookByCode(book_code);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find book'
        });
      } else if (book.stock <= 0) {
        return res.status(404).json({
          success: false,
          message: 'Book is currently borrowed.'
        });
      }

      const checkMember = await recordService.findRecordByMemberAndNotReturned(member_code);
      if (checkMember) {
        const borrow_date = new Date(checkMember.borrow_date);
    
        const timeDifference = now.getTime() - borrow_date.getTime();
        const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
        let count_date = Math.ceil(dayDifference);
        if(count_date > 7) {
          return res.status(404).json({
            success: false,
            message: 'Member cannot borrow until return book'
          });
        }
      }

      const record = await recordService.findRecordByCodeAndNotReturned(member_code, book_code);
      if (record) {
        return res.status(404).json({
          success: false,
          message: 'Book is currently borrowed.'
        });
      }

      const data = {
        member_code: member_code,
        book_code: book_code,
        borrow_date: now,
      }

      const dataMember = {
        book_borrowed: member.book_borrowed + 1,
      }

      const dataBook = {
        stock: book.stock - 1,
      }

      const update_record = await recordService.borrowBook(data);
      await memberService.updateMember(member_code, dataMember);
      await bookService.updateBook(book_code, dataBook);
      res.status(201).json({
        success: true,
        message: 'Borrow book successfully',
        data: update_record
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  static async returnBook(req, res) {
    try {
      const { member_code, book_code } = req.params;
      const now = new Date();

      const record = await recordService.findRecordByCodeAndNotReturned(member_code, book_code);
      
      if (!record) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find record'
        });
      }

      const member = await memberService.findMemberByCode(member_code);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find member'
        });
      }

      const book = await bookService.findBookByCode(book_code);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find book'
        });
      }

      const borrow_date = new Date(record.borrow_date);
    
      const timeDifference = now.getTime() - borrow_date.getTime();
      const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
      let count_date = Math.ceil(dayDifference);
      
      let penalty_date = null;
      if(count_date > 7) {
        penalty_date = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
      }

      const data = {
        return_date: now
      }

      const dataMember = {
        book_borrowed: member.book_borrowed - 1,
        penalty_date: penalty_date,
      }

      const dataBook = {
        stock: book.stock + 1,
      }

      const update_record = await recordService.returnBook(member_code, book_code, data);
      await memberService.updateMember(member_code, dataMember);
      await bookService.updateBook(book_code, dataBook);
      res.status(201).json({
        success: true,
        message: 'Return book successfully',
        data: update_record
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  static async deleteRecord(req, res) {
    try {
      const { id } = req.params;
      const record = await recordService.findRecordById(id);
      if (!record) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find record'
        });
      }
      await recordService.deleteRecord(id);
      res.status(201).json({
        success: true,
        message: 'Deleted record successfully'
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports = RecordController;
