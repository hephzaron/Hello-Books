# Books

## Create a book

> Request body

```javascript
{
  "title": "Java programming for beginners",
  "genre_id": 1,
  "description": "This introduces readers to the basic of Object Oriented Programmng Language",
  "ISBN": "1234-5678-90123",
  "quantity": 5,
  "documentURL": "",
  "coverPhotoURL": ""
}
```

> Response body (application/json)

```javascript
{
  "message": "Java programming for beginners have been added to library",
  "book": {
    "id": 1,
    "title": "Java programming for beginners",
    "genre_id": 1,
    "description": "This introduces readers to the basic of Object Oriented Programmng Language",
    "ISBN": "1234-5678-90123",
    "quantity": 5,
    "available": 5,
    "documentURL": "",
    "coverPhotoURL": "",
    "updatedAt": "2018-03-05T14:28:29.049Z",
    "createdAt": "2018-03-05T14:28:29.049Z"
  }
}
```

This endpoint creates a book.

### HTTP Request

`POST /books`

### HTTP Response

`201 Created`

## Edit a book

> Request body

```javascript
{
  "documentURL": "req.body.documentURL"
}
```

> Response body (application/json)

```javascript
{
  "message": "Java programming for beginners record have been updated",
  "updatedBook": {
    "id": 1,
    "title": "Java programming for beginners",
    "genre_id": 1,
    "description": "This introduces readers to the basic of Object Oriented Programmng Language",
    "ISBN": "1234-5678-90123",
    "quantity": 5,
    "available": 5,
    "documentURL": "req.body.documentURL",
    "coverPhotoURL": "",
    "updatedAt": "2018-03-05T14:28:29.049Z",
    "createdAt": "2018-03-05T14:28:29.049Z"
  }
}
```

This endpoint edits a book.

### HTTP Request

`PUT /books/:bookId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
bookId | The ID of the book

## Get all books with its authors

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "books": [
    {
      "id": 1,
      "title": "Java programming for beginners",
      "genre_id": 1,
      "description": "This introduces readers to the basic of Object Oriented Programmng Language",
      "ISBN": "33332-143-2457",
      "quantity": 7,
      "available": 7,
      "documentURL": "req.body.documentURL",
      "coverPhotoURL": "req.body.coverPhotoURL",
      "createdAt": "2018-03-04T15:36:19.802Z",
      "updatedAt": "2018-03-04T15:36:19.802Z",
      "Authors": [
        { }
      ]
    },
    ...
  ]
}
```

This endpoint get all books.

### HTTP Request

`GET /books`

### HTTP Response

`200 OK`


## Get a single book with it(s) author(s)

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "book": [
    {
      "id": 1,
      "title": "Java programming for beginners",
      "genre_id": 1,
      "description": "This introduces readers to the basic of Object Oriented Programmng Language",
      "ISBN": "33332-143-2457",
      "quantity": 7,
      "available": 7,
      "documentURL": "req.body.documentURL",
      "coverPhotoURL": "req.body.coverPhotoURL",
      "createdAt": "2018-03-04T15:36:19.802Z",
      "updatedAt": "2018-03-04T15:36:19.802Z",
      "Authors": [
        {
          "fullName": "Charles Philip",
          ...
        }
      ]
    }
  ]
}
```

This endpoint gets a single book.

### HTTP Request

`GET /books/:bookId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
bookId | The ID of the book

## Search for books

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": "Book found",
  "books": [
    {
      "id": 2,
      "title": "Fundamentals of Statistics for Data Scientist",
      "genre_id": 3,
      "description": "Learn the fundamentals of big data analysis",
      ...
      "Authors": [
        {
          "fullName": "Nelkon Parker",
          "id": 1,
          ...
        }
      ]
      },
      {
        "id": 3,
        "title": "R - the tool for data science",
        "genre_id": 3,
        "description": "R language is the most widely used language for data analysis..",
        ...
        "Authors": [
          {
            "fullName": "Nelkon Parker",
            "id": 1,
            ...
          },
          {
            "fullName": "Charles Philip",
            "id": 2,
            ...
          }
        ]
      }
    ]
}
```

This endpoint searches for a book

### HTTP Request

`GET /search`

### HTTP Response

`200 OK`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
type | undefined | Sets the type of searching that is being done. `Possible parameters are 'books' or 'authors'`
q | undefined | The search query string

<aside class="notice">
 The search query strings finds related words within book title and description and returns all such occurrences
</aside>

## Delete a book

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": "Book have been successfully deleted"
}
```

This endpoint deletes a single book by id.

### HTTP Request

`DELETE /books/:bookId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
bookId | The ID of the book