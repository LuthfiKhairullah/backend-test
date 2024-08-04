const BookRepository = require('../../domain/repositories/BookRepository');
const BookModel = require('../orm/BookModel');
const Book = require('../../domain/entities/Book');

class SequelizeBookRepository extends BookRepository {
  async findAllBook() {
    const bookData = await BookModel.findAll();
    if (!bookData) return null;
    return bookData;
  }

  async findByCode(code) {
    const bookData = await BookModel.findByPk(code);
    if (!bookData) return null;
    return bookData;
  }

  async save(book) {
    const bookData = await BookModel.create(book);
    return bookData;
  }

  async update(book) {
    await BookModel.update({
      title: book.title,
      author: book.author,
      stock: book.stock,
    }, { where: { code: book.code } });
    return book;
  }

  async delete(code) {
    await BookModel.destroy({ where: { code: code } });
  }
}

module.exports = SequelizeBookRepository;
