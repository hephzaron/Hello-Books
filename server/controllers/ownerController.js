const Owners = require('../models').Ownership;


module.exports = {
    create(req, res) {
        return Owners
            .create({
                authorId: req.params.authorId,
                bookId: req.params.bookId
            })
            .then(owners => res.status(200).send(owners))
            .catch(err => res.status(400).send(err));
    }


};