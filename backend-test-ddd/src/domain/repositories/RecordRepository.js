class RecordRepository {
  async findAllRecord() {
    throw new Error('Not implemented');
  }

  async findById(id) {
    throw new Error('Not implemented');
  }

  async findByMemberAndNotReturned(member_code) {
    throw new Error('Not implemented');
  }

  async findByCode(member_code, book_code) {
    throw new Error('Not implemented');
  }

  async findByCodeAndNotReturned(member_code, book_code) {
    throw new Error('Not implemented');
  }

  async save(record) {
    throw new Error('Not implemented');
  }

  async update(record) {
    throw new Error('Not implemented');
  }

  async delete(id) {
    throw new Error('Not implemented');
  }
}

module.exports = RecordRepository;
