# Author books

## Assign book(s) to  authors

> Request body

```javascript
{}
```

> Response body

```javascript
{
  "message": "Book have been assigned successfully",
  "authorBook": {
    "ownerId": 1,
    "authorId": 1,
    "bookId": 1,
    "updatedAt": "2018-03-05T19:26:12.955Z",
    "createdAt": "2018-03-05T19:26:12.955Z"
  }
}
```

This endpoint assigns book(s) to an author

### HTTP Request

`POST /authors/:authorId/books/:bookId`

### HTTP Response

`201 Created`


### URL Parameters

Parameter | Description
--------- | -----------
authorId | The ID of the author
bookId | The ID of the book


