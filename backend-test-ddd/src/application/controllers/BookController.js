const BookService = require('../services/BookService');
const SequelizeBookRepository = require('../../infrastructure/repositories/SequelizeBookRepository');

const bookRepository = new SequelizeBookRepository();
const bookService = new BookService(bookRepository);

class BookController {
  static async getAllBook(req, res) {
    try {
      const book = await bookService.findAllBook();

      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find books'
        });
      }

      res.status(201).json({
        success: true,
        data: book
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  static async getBook(req, res) {
    try {
      const { code } = req.params;
      const book = await bookService.findBookByCode(code);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find book'
        });
      }
      res.status(201).json({
        success: true,
        data: book
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  static async createBook(req, res) {
    try {
      const {
        code,
        title,
        author,
        stock,
      } = req.body;

      const isBookExists = await bookService.findBookByCode(code);
      if (isBookExists) {
        return res.status(404).json({
          success: false,
          message: 'Book is already exists'
        });
      }

      const data = {
        code: code,
        title: title,
        author: author,
        stock: stock,
      }

      const book = await bookService.createBook(data);
      res.status(201).json({
        success: true,
        message: 'Created book successfully',
        data: book
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  static async updateBook(req, res) {
    try {
      const { code } = req.params;
      const {
        title,
        author,
        stock,
      } = req.body;

      const book = await bookService.findBookByCode(code);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find book'
        });
      }

      const data = {
        title: title,
        author: author,
        stock: stock,
      }

      const update_book = await bookService.updateBook(code, data);
      res.status(201).json({
        success: true,
        message: 'Updated book successfully',
        data: update_book
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }

  static async deleteBook(req, res) {
    try {
      const { code } = req.params;
      const book = await bookService.findBookByCode(code);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Cannot find book'
        });
      }
      await bookService.deleteBook(code);
      res.status(201).json({
        success: true,
        message: 'Deleted book successfully'
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
}

module.exports = BookController;
