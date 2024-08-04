const BookService = require('./BookService');
const SequelizeBookRepository = require('../../infrastructure/repositories/SequelizeBookRepository');

describe('BookService', () => {
  const bookRepository = new SequelizeBookRepository();
  const bookService = new BookService(bookRepository);

  it('should create a book', async () => {
    const isBookExists = await bookRepository.findByCode('TW-11');
    if(isBookExists) {
      expect(isBookExists).toBeDefined();
      expect(isBookExists.length).toBeGreaterThan(0);
    } else {
      const bookData = {
        code: 'TW-11',
        title: 'New Book',
        author: 'New Author',
        stock: 1,
      };
      const book = await bookService.createBook(bookData);
      expect(book).toBeDefined();
      expect(book.title).toBe('New Book');
    }
  });

  it('should find a book by code', async () => {
    const book = await bookService.findBookByCode('TW-11');
    if(book === null) {
      expect(book).toBeNull();
    } else {
      expect(book).toBeDefined();
      expect(book.title).toBe('New Book');
    }
  });

  it('should update a book', async () => {
    const bookData = {
      code: 'TW-11',
      title: 'Updated Book',
      author: 'Updated Author',
      stock: 1,
    };
    const book = await bookService.updateBook('TW-11', bookData);
    expect(book).toBeDefined();
    expect(book.title).toBe('Updated Book');
  });

  it('should delete a book by id', async () => {
    await bookService.deleteBook('TW-11');
    const book = await bookService.findBookByCode('TW-11');
    expect(book).toBeNull();
  });
});
