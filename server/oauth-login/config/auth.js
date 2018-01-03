module.exports = {
    'googleAuth': {
        'clientID': '684362273363-qq1beb8an2ed72d4lpu67n8mfqodg64r.apps.googleusercontent.com',
        'clientSecret': 'CZX4PLOHzp0sLYhmJh8d0GzN',
        'callbackURL': 'http://localhost:5432/oauth2callback'
    },
    'facebookAuth': {
        'clientID': '323594918120442',
        'clientSecret': '89c897caa40672fa88a07d91ad745e8a',
        'callbackURL': 'http://localhost:5432/auth/facebook/callback',
         profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
    }

};