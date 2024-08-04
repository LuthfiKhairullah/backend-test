const RecordRepository = require('../../domain/repositories/RecordRepository');
const RecordModel = require('../orm/RecordModel');
const Record = require('../../domain/entities/Record');

class SequelizeRecordRepository extends RecordRepository {
  async findAllRecord() {
    const recordData = await RecordModel.findAll();
    if (!recordData) return null;
    return recordData;
  }

  async findById(id) {
    const recordData = await RecordModel.findOne({
      where: {
        id: id
      },
    });
    if (!recordData) return null;
    return recordData;
  }

  async findByMemberAndNotReturned(member_code) {
    const recordData = await RecordModel.findOne({
      where: {
        member_code: member_code,
        return_date: null,
      },
      order: [['borrow_date', 'DESC']],
    });
    if (!recordData) return null;
    return recordData;
  }

  async findByCode(member_code, book_code) {
    const recordData = await RecordModel.findOne({
      where: {
        member_code: member_code,
        book_code: book_code,
      },
    });
    if (!recordData) return null;
    return recordData;
  }

  async findByCodeAndNotReturned(member_code, book_code) {
    const recordData = await RecordModel.findOne({
      where: {
        member_code: member_code,
        book_code: book_code,
        return_date: null,
      },
    });
    if (!recordData) return null;
    return recordData;
  }

  async save(record) {
    const recordData = await RecordModel.create(record);
    return recordData;
  }

  async update(record) {
    await RecordModel.update({
      return_date: record.return_date,
    }, { where: { member_code: record.member_code, book_code: record.book_code, return_date: null } });
    return record;
  }

  async delete(id) {
    await RecordModel.destroy({ where: { id: id } });
  }
}

module.exports = SequelizeRecordRepository;
