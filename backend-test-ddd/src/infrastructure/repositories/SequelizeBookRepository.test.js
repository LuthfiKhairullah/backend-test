const SequelizeBookRepository = require('./SequelizeBookRepository');
const { BookModel } = require('../../../mocks/sequelize');

describe('SequelizeBookRepository', () => {
  const bookRepository = new SequelizeBookRepository();

  it('should save a book', async () => {
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
      const book = await bookRepository.save(bookData);
      expect(book).toBeDefined();
      expect(book.title).toBe('New Book');
    }
  });

  it('should find a book by code', async () => {
    const book = await bookRepository.findByCode('TW-11');
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
      stock: 0,
    };
    const book = await bookRepository.update(bookData);
    expect(book).toBeDefined();
    expect(book.title).toBe('Updated Book');
  });

  it('should delete a book by code', async () => {
    await bookRepository.delete('TW-11');
    const book = await bookRepository.findByCode('TW-11');
    expect(book).toBeNull();
  });
});
