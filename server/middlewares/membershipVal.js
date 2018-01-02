/*Calculate memebership value for each regstered memebers and categorise memebers into
 gold, silver and platinum are used to represent memebership value, this will determine how 
 long a user can have a book and the number of books that can be borrowed per time*/

const Users = require('../models').User;
const Borrowed = require('../models').Borrowed;

module.exports = {
    memberVal: function(req, res, next) {
        //This compute how long a user have been active on platform
        Users.find({
            where: {
                id: req.params.userId
            }
        }).then(users => {
            if (!users) { res.status(403).send('User not found'); }
            if (users) {
                //Time since user registered
                let now = new Date();
                let createdAt = users.createdAt;
                let duration = (now - createdAt) / (60 * 60 * 1000 * 24 * 30);
                // find avergarage book return time
                Borrowed.findAndCountAll({
                    where: {
                        userId: req.params.userId,
                        returned: true
                    }
                }).then(borrowed => {
                    // calculate average book return time
                    if (borrowed) {
                        let memVal;
                        if (borrowed.count > 0) {
                            let array = [];
                            let mVal = 0;
                            for (let i = 0; i < borrowed.count; i++) {
                                const imVal = (borrowed.rows[i].updatedAt - borrowed.rows[i].createdAt) / (60 * 60 * 24 * 1000);
                                mVal += imVal;
                                array.push(mVal);
                            }
                            let returnTime = (array[borrowed.count - 1]) / (borrowed.count);
                            memVal = duration * returnTime;
                        } else { memVal = 0; }

                        // Get the total number of books yet to be returned by the user
                        Borrowed.findAndCountAll({
                            where: {
                                userId: req.params.userId,
                                returned: false
                            }
                        }).then(userCount => {
                            if (!userCount) { throw Error; }
                            if (userCount) {
                                if (memVal <= 0.35) {
                                    users.update({
                                        memValue: 'platinum'
                                    });
                                    if (userCount.count <= 1) {
                                        next();
                                    } else { res.status(403).send('You are not allowed to borrow more than 1 book'); }
                                } else if (memVal > 0.35 && memVal < 0.7) {
                                    users.update({
                                        memValue: 'silver'
                                    });
                                    if (userCount.count <= 2) {
                                        next();
                                    } else { res.status(403).send('You are not allowed to borrow more than 2 books'); }
                                } else if (memVal >= 0.7) {
                                    users.update({
                                        memValue: 'gold'
                                    });
                                    if (userCount.count <= 3) {
                                        next();
                                    } else { res.status(403).send('You are not allowed to borrow more than 3 books'); }
                                }
                            }
                        }).catch(err => res.status(404).send(err));
                    }
                }).catch(err => res.status(404).send(err));
            }
        }).catch(err => res.status(404).send(err));

    }
};