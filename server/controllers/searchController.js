const Books = require('../models').Book;
const Authors = require('../models').Author;

const searchAuthors = (req, res) => {
    return Authors
        .findAll({
            where: {
                fullName: {
                    $iLike: `${req.query.q}%`
                }
            },
            include: [{
                model: Books
            }]
        })
        .then((authors) => {
            if (!authors && authors.length === 0) {
                return res.status(404).send({
                    message: 'Author not found'
                });
            }
            return res.status(200).send({
                message: 'Author found',
                authors
            });
        })
        .catch(() => {
            return res.status(500).send({
                message: 'Internal Server Error'
            });
        });
};
const searchBooks = (req, res) => {
    return Books
        .findAll({
            where: {
                title: {
                    $iLike: `${req.query.q}%`
                }
            }
        })
        .then((books) => {
            if (!books && books.length === 0) {
                return res.status(404).send({
                    message: 'Book not found'
                });
            }
            return res.status(200).send({
                message: 'Book found',
                books
            });
        })
        .catch(() => {
            return res.status(500).send({
                message: 'Internal Server Error'
            });
        });
};

const getSearchResult = (req, res) => {
    const { type } = req.query;
    switch (type) {
        case 'books':
            searchAuthors(req, res);
            break;
        case 'authors':
            searchBooks(req, res);
            break;
        default:
            return res.status(400).send({
                message: 'Specify a search type'
            });
    }
};

export default { getSearchResult };