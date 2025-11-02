const express = require('express');

const router = express.Router();


let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
]

// Récupérer tous les livres
router.get('/', (req, res) => {
    res.json(books);
});

// Ajouter un nouveau livre
router.post('/', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

module.exports = router;