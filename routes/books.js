const express = require('express');
const router = express.Router();
const Books = require('../models').Books;

// GET books listing
router.get('/', (req, res, next) => {
  Books.findAll({ order: [['title', 'ASC']] })
    .then(books => {
      res.render('books/index', { books: books, title: 'Book Manager' });
    })
    .catch(error => {
      res.send(500);
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
  Books.create(req.body)
    .then(book => {
      res.redirect('/books/' + book.id);
    })
    .catch(error => {
      res.send(500);
    });
});

// GET individual book
router.get('/:id', (req, res, next) => {
  Books.findByPk(req.params.id)
    .then(book => {
      if (book) {
        res.render('books/show', { books: book, title: book.title });
      } else {
        res.render('error', {
          error: {
            status: 404,
            message: 'Sorry, we do not have that book in our database'
          }
        });
      }
    })
    .catch(error => {
      res.send(500);
    });
});

// Edit a book
router.get('/:id/edit', (req, res, next) => {
  Books.findByPk(req.params.id)
    .then(book => {
      if (book) {
        res.render('books/edit', {
          books: book,
          title: 'Edit Book'
        });
      } else {
        res.render('error', {
          error: {
            status: 404,
            message: 'Sorry, we do not have that book in our database'
          }
        });
      }
    })
    .catch(error => {
      res.send(500);
    });
});

// Updated book.
router.post('/:id/edit', (req, res, next) => {
  Books.findByPk(req.params.id)
    .then(book => {
      if (book) {
        return book.update(req.body);
      } else {
        res.render('error', {
          error: {
            status: 404,
            message: 'Sorry, we do not have that book in our database'
          }
        });
      }
    })
    .then(book => {
      res.redirect('/books/' + book.id);
    });
});

// Delete book form
router.get('/:id/delete', function(req, res, next) {
  Books.findByPk(req.params.id)
    .then(book => {
      if (book) {
        res.render('books/delete', {
          books: book,
          title: 'Delete Book'
        });
      } else {
        res.render('error', {
          error: {
            status: 404,
            message: 'Sorry, we do not have that book in our database'
          }
        });
      }
    })
    .catch(error => {
      res.send(500);
    });
});

// Delete path
router.post('/:id/delete', function(req, res, next) {
  Books.findByPk(req.params.id)
    .then(function(book) {
      if (book) {
        return book.destroy();
      } else {
        res.render('error', {
          error: {
            status: 404,
            message: 'Sorry, we do not have that book in our database'
          }
        });
      }
    })
    .then(function() {
      res.redirect('/books');
    })
    .catch(error => {
      res.send(500);
    });
});

module.exports = router;
