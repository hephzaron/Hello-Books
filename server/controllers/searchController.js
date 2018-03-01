const Books = require('../models').Book;
const Authors = require('../models').Author;
const paginate = require('./paginate').paginate;
const returnObject = require('./paginate').returnObject;

const searchAuthors = (req, res) => {
    const { count, page } = req.query;
    let { limit, offset } = paginate(page, count);
    return Authors
        .findAll({
            limit,
            offset,
            order: [
                ['id', 'ASC']
            ],
            where: {
                $or: [{
                    firstName: {
                        $iLike: `%${req.query.q}%`
                    }
                }, {
                    lastName: {
                        $iLike: `%${req.query.q}%`
                    }
                }]
            },
            include: [{ model: Books }]
        })
        .then((authors) => {
            if (!authors && authors.length === 0) {
                return res.status(404).send({
                    message: 'Author not found'
                });
            }
            return res.status(200).send(
                Object.assign({}, { message: 'Author found' },
                    returnObject(authors, 'authors')));
        })
        .catch(() => {
            return res.status(500).send({
                message: 'Internal Server Error'
            });
        });
};
const searchBooks = (req, res) => {
    const { count, page } = req.query;
    let { limit, offset } = paginate(page, count);
    return Books
        .findAll({
            limit,
            offset,
            order: [
                ['id', 'ASC']
            ],
            where: {
                $or: [{
                    title: {
                        $iLike: `%${req.query.q}%`
                    }
                }, {
                    description: {
                        $iLike: `%${req.query.q}%`
                    }
                }]
            },
            include: [{ model: Authors }]
        })
        .then((books) => {
            if (!books && books.length === 0) {
                return res.status(404).send({
                    message: 'Book not found'
                });
            }
            return res.status(200).send(
                Object.assign({}, { message: 'Book found' },
                    returnObject(books, 'books')));
        })
        .catch(() => {
            return res.status(500).send({
                message: 'Internal Server Error'
            });
        });
};

module.exports = {
    getSearchResult(req, res) {
        const { type } = req.query;
        switch (type) {
            case 'authors':
                searchAuthors(req, res);
                break;
            case 'books':
                searchBooks(req, res);
                break;
            default:
                return res.status(400).send({
                    message: 'Specify a search type'
                });
        }
    }
}