require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DEV_USER || 'postgres',
        password: process.env.DEV_PASSWORD || 1234,
        database: 'library',
        host: '127.0.0.1',
        port: process.env.DEV_PORT || 8000,
        dialect: 'postgres'

    },
    test: {
        username: process.env.TEST_USER || 'postgres',
        password: process.env.TEST_PASSWORD || 1234,
        database: 'testdb',
        host: '127.0.0.1',
        port: process.env.TEST_PORT || 8000,
        dialect: 'postgres'
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
    }

}