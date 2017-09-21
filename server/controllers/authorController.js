const Authors = require('../models').Author;

module.exports = {
    create(req, res) {
        return Authors
            .create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death,
                name: req.body.first_name + ' ' + req.body.last_name
                    //life_span: req.body.date_of_death - req.body.date_of_birth
            })
            .then(authors => res.status(200).send(authors))
            .catch(err => res.status(400).send(err));
    }
};