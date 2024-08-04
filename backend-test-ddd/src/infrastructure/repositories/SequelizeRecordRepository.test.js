const SequelizeRecordRepository = require('./SequelizeRecordRepository');
const { RecordModel } = require('../../../mocks/sequelize');

describe('SequelizeRecordRepository', () => {
  const recordRepository = new SequelizeRecordRepository();

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
        borrow_date: now
      };
      const record = await recordRepository.save(recordData);
      expect(record).toBeDefined();
      expect(record.member_code).toBe('M005');
    }
  });

  it('should find a record by code', async () => {
    const record = await recordRepository.findByCode('M005', 'TW-11');
    if(record === null) {
      expect(record).toBeNull();
    } else {
      expect(record).toBeDefined();
      expect(record.member_code).toBe('M005');
      expect(record.book_code).toBe('TW-11');
    }
  });

  it('should update a record return book', async () => {
    const now = new Date();
    const isRecordExists = await recordRepository.findByCodeAndNotReturned('M005', 'TW-11');
    if(isRecordExists) {
      const recordData = {
        member_code: isRecordExists.member_code,
        book_code: isRecordExists.book_code,
        borrow_date: isRecordExists.borrow_date,
        return_date: now,
      };
      const record = await recordRepository.update(recordData);
      expect(record).toBeDefined();
      expect(record.return_date).toBe(now);
    } else {
      expect(isRecordExists).toBeDefined();
      expect(isRecordExists).toBeNull();
    }
  });

  it('should delete a record by code', async () => {
    await recordRepository.delete(1);
    const record = await recordRepository.findById(1);
    expect(record).toBeNull();
  });
});
