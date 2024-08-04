const Book = require("../../domain/entities/Book");

class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async findAllBook() {
    return await this.bookRepository.findAllBook();
  }

  async findBookByCode(code) {
    return await this.bookRepository.findByCode(code);
  }

  async createBook(bookData) {
    const book = new Book(bookData.code, bookData.title, bookData.author, bookData.stock);
    return await this.bookRepository.save(book);
  }

  async updateBook(code, bookData) {
    const book = await this.bookRepository.findByCode(code);
    if(bookData.title != null) book.title = bookData.title;
    if(bookData.author != null) book.author = bookData.author;
    if(bookData.stock != null) book.stock = bookData.stock;
    
    return await this.bookRepository.update(book);
  }

  async deleteBook(code) {
    return await this.bookRepository.delete(code);
  }
}

module.exports = BookService;
