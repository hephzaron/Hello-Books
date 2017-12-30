[![Build Status](https://travis-ci.org/hephzaron/Hello-Books.svg?branch=master)](https://travis-ci.org/hephzaron/Hello-Books)
[![Code Climate](https://codeclimate.com/github/hephzaron/Hello-Books/badges/gpa.svg)](https://codeclimate.com/github/hephzaron/Hello-Books)
[![Test Coverage](https://codeclimate.com/github/hephzaron/Hello-Books/badges/coverage.svg)](https://codeclimate.com/github/hephzaron/Hello-Books/coverage)
[![Coverage Status](https://coveralls.io/repos/github/hephzaron/Hello-Books/badge.svg?branch=master)](https://coveralls.io/github/hephzaron/Hello-Books?branch=master)
[![Issue Count](https://codeclimate.com/github/hephzaron/Hello-Books/badges/issue_count.svg)](https://codeclimate.com/github/hephzaron/Hello-Books)

# Hello-Books

Hello-Books is an E-Library application that helps manage the inflow and outflow of books, tracks and monitors users to ensure book is returned as at when due. It also send notifications to users for books borrrowed that are over-due to be reteurned.

## Table of Contents

* [Installation and Setup](#installation-and-setup)
* [Authentication](#authentication)
* [Testing](#testing)
* [License](#license)
* [Author](#author)
* [Contributing guide](#contributing-guide)
* [Acknowledgement](#acknowledgement)

## Installation and setup

### Pre-requisites

Ensure the underlisted are installed on your PC before running this application

* Latest version of Nodejs - comes with a Node Package Manager

* Postgresql database

### Installing

1. Download or clone this branch at https://github.com/hephzaron/Hello-Books.git"
2. Navigate to working directory and install dependencies:

```
npm install 
```

3. Install sequelize-cli, Create Postgresql database, Navigate to server directory and run migrations:

```
npm install -g seqeulize-cli
cd server
sequelize db:migrate
```

4. Create a `.env` file in the root directory of the application. Use a different database for your testing and development. Example of the content of a .env file looks like this

```
PRIVATE_KEY=myprivatekey
TEST_DATABASE_URL=postgres://127.0.0.1:5432/hello-books-test
```

5. Start the server:

```
npm run start:dev
```

The server listens on port '5432' which can be changed by setting environment variable 'PORT'

Visit `http://localhost:5432/api`  to access the `api` endpoint.

## Authentication 

- It uses JSON Web Token (JWT) for user authentication.
- Token is generated on user login
- Token is perpetually verified to check the state of the user if logged in or not.
- Admin role and ordinary users are assigned on login for subsequent access to authorised routes.
- It also supports user-authorisation depending on user role(admn or non admin)

## Testing

- To test run `npm test` or `npm run test`

## License

This project is authored by **Daramola Tobi** (hephzaron@gmail.com) and is licensed for your use, modification and distribution under the **MIT** license.
[MIT][license] © [hephzaron][author]
<!-- Definitions -->
[license]: LICENSE
[author]: hephzaron

## Author

**Daramola Tobi** (hephzaron@gmail.com)is an aspiring developer passionate about building real apps to enhance his learning and sharpen his programming skills.

## Contributing Guide

Thank you for your interest in contributing to this package. I currently accept contributions and corrections from everyone but should be according to standards
To contribute,

1. Fork the project
1. Create a feature branch, branch away from `master`
1. Write tests, using `Mocha and Chai` or any other testing frameworks, and code
1. If you have multiple commits please combine them into a few logically organized commits by [squashing them](git-squash)
1. Push the commit(s) to your fork
1. Submit a merge request (MR) to the `master` branch
1. The MR title should describe the change you want to make
1. The MR description should give a motive for your change and the method you used to achieve it.
  1. Mention the issue(s) your merge request solves, using the `Solves #XXX` or
    `Closes #XXX` syntax to auto-close the issue(s) once the merge request will
    be merged.
1. Be prepared to answer questions and incorporate feedback even if requests for this arrive weeks or months after your MR submission
  1. If a discussion has been addressed, select the "Resolve discussion" button beneath it to mark it resolved.
1. When writing commit messages please follow
   [these guidelines](http://chris.beams.io/posts/git-commit).

## Acknowledgement

I would like to use this medium to acknowledge **Temitayo Fadojutimi** who have helped me thus far in areas that looks confusing, his contributions by suggestions, advice and guides have really encouraged me to press on.He tweets at [@adesege_](http://twitter.com/adesege_)

**Ekundayo Abiona** (ekundayo.abiona@andela.com) is not left out, whose project work have been of immense benefit to me as a guide for Continous integration and Test Coverage Reporting config.