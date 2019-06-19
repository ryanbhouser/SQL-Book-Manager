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

module.exports = router;
