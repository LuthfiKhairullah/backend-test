const express = require('express');
const BookController = require('./src/application/controllers/BookController');
const MemberController = require('./src/application/controllers/MemberController');
const RecordController = require('./src/application/controllers/RecordController');
require('dotenv').config();

const baseURL = "/api";
const app = express();
app.use(express.json());

app.get(`${baseURL}/books`, BookController.getAllBook);
app.get(`${baseURL}/books/:code`, BookController.getBook);
app.post(`${baseURL}/books`, BookController.createBook);
app.put(`${baseURL}/books/:code`, BookController.updateBook);
app.delete(`${baseURL}/books/:code`, BookController.deleteBook);
app.get(`${baseURL}/members`, MemberController.getAllMember);
app.get(`${baseURL}/members/:code`, MemberController.getMember);
app.post(`${baseURL}/members`, MemberController.createMember);
app.put(`${baseURL}/members/:code`, MemberController.updateMember);
app.delete(`${baseURL}/members/:code`, MemberController.deleteMember);
app.get(`${baseURL}/records`, RecordController.getAllRecord);
app.get(`${baseURL}/records/:id`, RecordController.getRecord);
app.post(`${baseURL}/records/borrow_book/:member_code/:book_code`, RecordController.borrowBook);
app.put(`${baseURL}/records/return_book/:member_code/:book_code`, RecordController.returnBook);
app.delete(`${baseURL}/records/:id`, RecordController.deleteRecord);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
