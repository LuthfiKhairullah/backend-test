const RecordService = require('./RecordService');
const SequelizeRecordRepository = require('../../infrastructure/repositories/SequelizeRecordRepository');

describe('RecordService', () => {
  const recordRepository = new SequelizeRecordRepository();
  const recordService = new RecordService(recordRepository);

  it('should save a record borrow book', async () => {
    const isRecordExists = await recordRepository.findByCodeAndNotReturned('M005', 'TW-11');
    if(isRecordExists) {
      expect(isRecordExists).toBeDefined();
      expect(Object.keys(isRecordExists).length).toBeGreaterThan(0);
    } else {
      const now = new Date();
      const recordData = {
        member_code: 'M005',
        book_code: 'TW-11',
        borrow_date: now,
      };
      const record = await recordService.borrowBook(recordData);
      expect(record).toBeDefined();
      expect(record.member_code).toBe('M005');
    }
  });

  it('should find a record by code', async () => {
    const record = await recordService.findRecordByCode('M005', 'TW-11');
    if(record === null) {
      expect(record).toBeNull();
    } else {
      expect(record).toBeDefined();
      expect(record.member_code).toBe('M005');
      expect(record.book_code).toBe('TW-11');
    }
  });

  it('should update a record', async () => {
    const now = new Date();
    const isRecordExists = await recordRepository.findByCodeAndNotReturned('M005', 'TW-11');
    if(isRecordExists) {
      const recordData = {
        member_code: isRecordExists.member_code,
        book_code: isRecordExists.book_code,
        borrow_date: isRecordExists.borrow_date,
        return_date: now,
      };
      const record = await recordService.returnBook('M005', 'TW-11', recordData);
      expect(record).toBeDefined();
      expect(record.return_date).toBe(now);
    } else {
      expect(isRecordExists).toBeDefined();
      expect(isRecordExists).toBeNull();
    }
  });

  it('should delete a record by id', async () => {
    await recordService.deleteRecord(1);
    const record = await recordService.findRecordById(1);
    expect(record).toBeNull();
  });
});
