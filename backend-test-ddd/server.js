const express = require('express');
const BookController = require('./src/application/controllers/BookController');
const MemberController = require('./src/application/controllers/MemberController');
const RecordController = require('./src/application/controllers/RecordController');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

const baseURL = "/api";
const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/**
 * @openapi
 * /api/books:
 *   get:
 *     summary: Retrieve all books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     description: Book code
 *                   title:
 *                     type: string
 *                     description: Book title
 *                   author:
 *                     type: string
 *                     description: Book author
 *                   stock:
 *                     type: integer
 *                     description: Book stock
 */
app.get(`${baseURL}/books`, BookController.getAllBook);
/**
 * @openapi
 * /api/books/{code}:
 *   get:
 *     summary: Retrieve a book by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Book code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 stock:
 *                   type: integer
 *       404:
 *         description: Book not found
 */
app.get(`${baseURL}/books/:code`, BookController.getBook);
/**
 * @openapi
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 stock:
 *                   type: integer
 */
app.post(`${baseURL}/books`, BookController.createBook);
/**
 * @openapi
 * /api/books/{code}:
 *   put:
 *     summary: Update a book by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Book code
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Book title
 *               author:
 *                 type: string
 *                 description: Book author
 *               stock:
 *                 type: integer
 *                 description: Book stock
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 stock:
 *                   type: integer
 *       404:
 *         description: Book not found
 */
app.put(`${baseURL}/books/:code`, BookController.updateBook);
/**
 * @openapi
 * /api/books/{code}:
 *   delete:
 *     summary: Delete a book by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Book code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 stock:
 *                   type: integer
 *       404:
 *         description: Book not found
 */
app.delete(`${baseURL}/books/:code`, BookController.deleteBook);
/**
 * @openapi
 * /api/members:
 *   get:
 *     summary: Retrieve all members
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     description: Member code
 *                   name:
 *                     type: string
 *                     description: Member name
 *                   penalty_date:
 *                     type: string
 *                     description: Member penalty until date
 *                   book_borrowed:
 *                     type: integer
 *                     description: Member book borrowed
 */
app.get(`${baseURL}/members`, MemberController.getAllMember);
/**
 * @openapi
 * /api/members/{code}:
 *   get:
 *     summary: Retrieve a member by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Member code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Member not found
 */
app.get(`${baseURL}/members/:code`, MemberController.getMember);
/**
 * @openapi
 * /api/members:
 *   post:
 *     summary: Create a new member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 name:
 *                   type: string
 */
app.post(`${baseURL}/members`, MemberController.createMember);
/**
 * @openapi
 * /api/members/{code}:
 *   put:
 *     summary: Update a member by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Member code
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Member name
 *     responses:
 *       200:
 *         description: Member updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *       404:
 *         description: Member not found
 */
app.put(`${baseURL}/members/:code`, MemberController.updateMember);
/**
 * @openapi
 * /api/members/{code}:
 *   delete:
 *     summary: Delete a member by code
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Member code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Member not found
 */
app.delete(`${baseURL}/members/:code`, MemberController.deleteMember);
/**
 * @openapi
 * /api/records:
 *   get:
 *     summary: Retrieve all records
 *     responses:
 *       200:
 *         description: A list of records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Record ID
 *                   member_code:
 *                     type: string
 *                     description: Member code
 *                   book_code:
 *                     type: string
 *                     description: Book code
 *                   borrow_date:
 *                     type: string
 *                     format: date
 *                     description: Record borrow date
 *                   return_date:
 *                     type: string
 *                     format: date
 *                     description: Record return date
 */
app.get(`${baseURL}/records`, RecordController.getAllRecord);
app.get(`${baseURL}/records/:id`, RecordController.getRecord);
/**
 * @openapi
 * /api/records/borrow_book/{member_code}/{book_code}:
 *   post:
 *     summary: Borrow a book
 *     parameters:
 *       - in: path
 *         name: member_code
 *         required: true
 *         description: Member code
 *         schema:
 *           type: string
 *       - in: path
 *         name: book_code
 *         required: true
 *         description: Book code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Borrow a book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 member_code:
 *                   type: string
 *                 book_code:
 *                   type: string
 *                 borrow_date:
 *                   type: string
 *                   format: date
 *                 return_date:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Record not found
 */
app.post(`${baseURL}/records/borrow_book/:member_code/:book_code`, RecordController.borrowBook);
/**
 * @openapi
 * /api/records/return_book/{member_code}/{book_code}:
 *   put:
 *     summary: Return a book
 *     parameters:
 *       - in: path
 *         name: member_code
 *         required: true
 *         description: Member code
 *         schema:
 *           type: string
 *       - in: path
 *         name: book_code
 *         required: true
 *         description: Book code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Return a book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 member_code:
 *                   type: string
 *                 book_code:
 *                   type: string
 *                 borrow_date:
 *                   type: string
 *                   format: date
 *                 return_date:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Record not found
 */
app.put(`${baseURL}/records/return_book/:member_code/:book_code`, RecordController.returnBook);
/**
 * @openapi
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Record ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 member_code:
 *                   type: string
 *                 book_code:
 *                   type: string
 *                 borrow_date:
 *                   type: string
 *                   format: date
 *                 return_date:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Record not found
 */
app.delete(`${baseURL}/records/:id`, RecordController.deleteRecord);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
