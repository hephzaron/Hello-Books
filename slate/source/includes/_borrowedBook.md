# Borrowed Books

## Borrow a book

> Request body

```javascript
{
  "bookId": 1
}
```

> Response body (application/json)

```javascript
{
  "message": "You have successfully borrowed this book",
  "borrowedBook": {
    "borrowId": 1,
    "userId": 1,
    "bookId": 1,
    "returned": false,
    "updatedAt": "2018-03-05T19:43:29.765Z",
    "createdAt": "2018-03-05T19:43:29.765Z"
  }
}
```

This endpoint allows a user to borrow a book

### HTTP Request

`POST /users/:userId/books/:bookId`

### HTTP Response

`201 Created`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user
bookId | The ID of the book

## Return a borrowed book

> Request body

```javascript
{
  "returned": true
}
```

> Response body (application/json)

```javascript
{
  "message": "You have succesfully returned this book",
  "returnedBook": {
    "borrowId": 1,
    "userId": 1,
    "bookId": 1,
    "returned": true,
    "createdAt": "2018-03-05T19:43:29.765Z",
    "updatedAt": "2018-03-05T19:43:29.765Z"
  }
}
```

This endpoint returns a borrowed book

### HTTP Request

`PUT /users/:userId/books/:bookId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user
bookId | The ID of the borrowed book

## Get unreturned books by a user

> Request body

```javascript
{}
```

> Response body

```javascript
{
  "borrowedBooks": {
    "id": 1,
    "userId": "aeeb4adc-d1aa-4cc4-8941-d4f2425b00b1",
    "username": "Hephzibah",
    "email": "hephzaron@gmail.com",
    "admin": false,
    "memValue": "platinum",
    "createdAt": "2018-03-04T15:38:11.476Z",
    "updatedAt": "2018-03-04T15:38:11.476Z",
    "Books": [
      {
        "title": "R - the tool for data science",
        "ISBN": "102-70-8934-5757",
        "Borrowed": {
          "returned": false
        }
      },
      {
        "title": "Java programming for beginners",
        "ISBN": "33332-143-2457",
        "Borrowed": {
          "returned": false
        }
      }
    ]
  }
}
```

This endpoint get borrowed books that are yet to be returned by a user

### HTTP Request

`GET /users/:userId/books`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
returned | undefined | The status of book borrowed and yet to be returned of type `bool`

## Get all borrowed books

> Request body

```javascript
{}
```

> Response body

```javascript
{
  "userBooks": [
    {
      "id": 1,
      "userId": "c614d169-1bc2-4830-a928-5a078d7e4bca",
      "username": "Hephzibah",
      "email": "hephzaron@gmail.com",
      "admin": false,
      "memValue": "platinum",
      "createdAt": "2018-03-05T20:23:09.248Z",
      "updatedAt": "2018-03-05T20:23:09.248Z",
      "Books": [
        {
          "title": "Java programming for beginners",
          "ISBN": "33332-143-2457",
          "Borrowed": {
            "returned": false
          }
        },
        {
          "title": "R - the tool for data science",
          "ISBN": "102-70-8934-5757",
          "Borrowed": {
            "returned": false
          }
        }
      ]
    },
    ...
  ]
}
```

This endpoint get all borrowed books 

### HTTP Request

`GET /borrowed-books/users`

### HTTP Response

`200 OK`

