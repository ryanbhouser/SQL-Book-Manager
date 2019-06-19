const express = require('express');
const router = express.Router();
const Books = require('../models').Books;

// GET books listing
router.get('/', (req, res, next) => {
  Books.findAll({ order: [['title', 'ASC']] }).then(books => {
    res.render('books/index', {
      books: books,
      title: 'Book Manager'
    });
  });
});

// Create a new book
router.get('/new', (req, res, next) => {
  res.render('books/new', {
    books: Books.build(),
    title: 'Add a New Book'
  });
});

// POST create book
router.post('/', (req, res, next) => {
  Books.create(req.body).then(book => {
    res.redirect('/books/' + book.id);
  });
});

// GET individual book
router.get('/:id', (req, res, next) => {
  Books.findByPk(req.params.id).then(book => {
    res.render('books/show', {
      books: book,
      title: book.title
    });
  });
});

module.exports = router;
