class Record {
  constructor(id, member_code, book_code, borrow_date, return_date) {
    this.id = id;
    this.member_code = member_code;
    this.book_code = book_code;
    this.borrow_date = borrow_date;
    this.return_date = return_date;
  }
}

module.exports = Record;