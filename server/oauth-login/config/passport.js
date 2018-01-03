let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;

//load user model
let OtherUsers = require('../../models').OtherUser;
let Users = require('../../models').User;


//load configuration file

const configAuth = require('./auth');
module.exports = (passport) => {
    //serialize user for session
    passport.serializeUser((user, done) => {
        return done(null, user.id);

    });

    //deserialize user
    passport.deserializeUser((id, done) => {
        return Users.findById(id).then((user) => {
            return done(null, user);
        }).catch(error => { return done(error, null); });
    });

    //Google configuration

    passport.use(new GoogleStrategy({

            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL

        },
        (accessToken, refreshToken, profile, done) => {

            // adopt asynchronous method, user won't fire until all data is returned from google
            process.nextTick(function() {
                let authId = 'google:' + profile.id;

                //find user based on their authentication id
                return OtherUsers.findOne({ where: { authId: authId } })
                    .then((user) => {
                        if (user) return done(null, user);
                        if (!user) {
                            //otherwise create user if not found
                            return OtherUsers.create({
                                authId: authId,
                                username: profile.displayName,
                                email: profile.emails[0].value,
                                token: accessToken
                            }).then((newUser) => {
                                if (newUser) {
                                    return Users.create({
                                        userId: newUser.guid,
                                        username: newUser.username,
                                        email: newUser.email
                                    }).then((createUser) => {
                                        if (createUser)
                                            return done(null, createUser);
                                    });
                                }
                            });
                        }
                    }).catch(error => { return done(error, null); });
            });

        }
    ));



    //Facebook configuration

    passport.use(new FacebookStrategy({

            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: configAuth.facebookAuth.profileFields

        },
        (accessToken, refreshToken, profile, done) => {

            // adopt asynchronous method, user won't fire until all data is returned from google
            process.nextTick(function() {
                let authId = 'facebook:' + profile.id;

                //find user based on their authentication id
                return OtherUsers.findOne({ where: { authId: authId } })
                    .then((user) => {
                        if (user) return done(null, user);
                        if (!user) {
                            //otherwise create user if not found
                            return OtherUsers.create({
                                authId: authId,
                                username: profile.name.givenName + ' ' + profile.name.familyName,
                                email: profile.emails[0].value,
                                token: accessToken
                            }).then((newUser) => {
                                if (newUser) {
                                    return Users.create({
                                        userId: newUser.guid,
                                        username: newUser.username,
                                        email: newUser.email
                                    }).then((createUser) => {
                                        if (createUser)
                                            return done(null, createUser);
                                    });
                                }
                            });
                        }
                    }).catch(error => { return done(error, null); });
            });

        }
    ));
};