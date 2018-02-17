const Owners = require('../models').Ownership;


module.exports = {
    create(req, res) {
        return Owners
            .create({
                authorId: req.params.authorId,
                bookId: req.params.bookId
            })
            .then(authorBook => res.status(201).send({
                message: 'Book have been assigned successfully',
                authorBook
            }))
            .catch(() => res.status(500).send({
                message: 'Internal Server Error'
            }));
    }


};