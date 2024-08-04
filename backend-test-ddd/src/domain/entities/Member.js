class Member {
  constructor(code, name, penalty_date, book_borrowed) {
    this.code = code;
    this.name = name;
    this.penalty_date = penalty_date;
    this.book_borrowed = book_borrowed;
  }
}

module.exports = Member;