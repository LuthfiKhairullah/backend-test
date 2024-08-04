const Record = require("../../domain/entities/Record");

class RecordService {
  constructor(recordRepository) {
    this.recordRepository = recordRepository;
  }

  async findAllRecord() {
    return await this.recordRepository.findAllRecord();
  }

  async findRecordById(id) {
    return await this.recordRepository.findById(id);
  }

  async findRecordByMemberAndNotReturned(member_code) {
    return await this.recordRepository.findByMemberAndNotReturned(member_code);
  }

  async findRecordByCode(member_code, book_code) {
    return await this.recordRepository.findByCode(member_code, book_code);
  }

  async findRecordByCodeAndNotReturned(member_code, book_code) {
    return await this.recordRepository.findByCodeAndNotReturned(member_code, book_code);
  }

  async borrowBook(recordData) {
    return await this.recordRepository.save(recordData);
  }

  async returnBook(member_code, book_code, recordData) {
    const record = await this.recordRepository.findByCodeAndNotReturned(member_code, book_code);
    if(recordData.return_date != null) record.return_date = recordData.return_date;
    
    return await this.recordRepository.update(record);
  }

  async deleteRecord(code) {
    return await this.recordRepository.delete(code);
  }
}

module.exports = RecordService;
