const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const BookModelMock = dbMock.define("books", {
  code: "TW-11",
  title: "Sample Book",
  author: "Author",
  stock: 1,
});

const MemberModelMock = dbMock.define("members", {
  code: "M005",
  name: "Sample Member",
});

const RecordModelMock = dbMock.define("records", {
  member_code: "M005",
  book_code: "TW-11",
});

module.exports = {
  BookModel: BookModelMock,
  MemberModel: MemberModelMock,
  RecordModel: RecordModelMock,
};
