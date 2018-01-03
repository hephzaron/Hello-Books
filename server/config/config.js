require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DEV_USER,
        password: process.env.DEV_PASSWORD,
        database: process.env.DEV_DB,
        host: process.env.DEV_HOST,
        port: process.env.DEV_PORT,
        dialect: 'postgres'

    },
    test: {
        username: 'tobi',
        password: 1234,
        database: 'testdb',
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres'
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
    }

}