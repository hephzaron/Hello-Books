---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript

toc_footers:
  - <a href='/docs/v1'>HiLib Documentation v1</a>
  - <a href='/'>Visit main site</a>

includes:
  - users
  - genres
  - authors
  - books
  - borrowedBook
  - authorBook
  - errors

search: true
---

# Introduction

Welcome to the HiLib API! You can use our API to access HiLib API endpoints, which can get information on various books, authors and users in our database.

You can view code examples in the dark area to the right.

HTTP Request url must be prepended with the base url

`BASE URL = http://hi-lib.herokuapp.com/api/v1`

# Authentication

> To authorize,

```javascript
  add `x-access-token` to your request header. 
  Its value must be a valid signed JWT token.
```

HiLib uses JWT to authenticate a user. The JWT token must be signed by the application and it has an expiry time of 24hours.

HiLibs expects that the token is included in every request like:

`x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

<aside class="notice">
You must replace <code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</code> with the signed token.
</aside>


## Login

> Request body

```javascript
{
  "username": "username",
  "password": "password"
}
```

> Response body (application/json)

```javascript
{
  "message": "Authentication successful",
  "user": {
    "username": "username",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1,
    "admin": false
  }
}
```

This endpoint logs a user into the application. The token should be included in subsequent request header.

### HTTP Request

`POST /users/signin`

### HTTP Response

`200 OK`