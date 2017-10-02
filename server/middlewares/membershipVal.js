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
                var now = new Date();
                var createdAt = users.createdAt;
                var duration = (now - createdAt) / (60 * 60 * 1000 * 24 * 30);
                // find avergarage book return time
                Borrowed.findAndCountAll({
                    where: {
                        userId: req.params.userId,
                        returned: true
                    }
                }).then(borrowed => {
                    // calculate average book return time
                    if (borrowed) {
                        if (borrowed.count > 0) {
                            var array = new Array();
                            var mVal = 0;
                            for (let i = 0; i < borrowed.count; i++) {
                                var imVal = (borrowed.rows[i].updatedAt - borrowed.rows[i].createdAt) / (60 * 60 * 24 * 1000);
                                mVal = mVal + imVal;
                                array.push(mVal);
                            }
                            var returnTime = (array[borrowed.count - 1]) / (borrowed.count);
                            var memVal = duration * returnTime;
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
                                    if (userCount.count <= 4) {
                                        next();
                                    } else { res.status(403).send('You are not allowed to borrow more than 5 books'); }
                                } else if (memVal > 0.35 && memVal < 0.7) {
                                    users.update({
                                        memValue: 'silver'
                                    });
                                    if (userCount.count <= 6) {
                                        next();
                                    } else { res.status(403).send('You are not allowed to borrow more than 7 books'); }
                                } else if (memVal >= 0.7) {
                                    users.update({
                                        memValue: 'gold'
                                    });
                                    if (userCount.count <= 9) {
                                        next();
                                    } else { res.status(403).send('You are not allowed to borrow more than 10 books'); }
                                }
                            }
                        }).catch(err => res.status(404).send(err));
                    }
                }).catch(err => res.status(404).send(err));
            }
        }).catch(err => res.status(404).send(err));

    }
};