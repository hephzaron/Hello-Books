# Authors

## Create an author

> Request body

```javascript
{
  "firstName" : "Mephyl",
  "lastName" : "Philip",
  "dateOfBirth":"1876-03-12"
}
```

> Response body (application/json)

```javascript
{
  "message": "Mephyl Philip, successfully added",
  "author": {
    "fullName": "Mephyl Philip",
    "lifeSpan": 3742416000000,
    "id": 1,
    "firstName": "Mephyl",
    "lastName": "Philip",
    "dateOfBirth": "1876-03-12T00:00:00.000Z",
    "dateOfDeath": null,
    "updatedAt": "2018-03-05T15:27:34.820Z",
    "createdAt": "2018-03-05T15:27:34.820Z"
  }
}
```

This endpoint creates an author.

### HTTP Request

`POST /authors`

### HTTP Response

`201 Created`

## Edit an author

> Request body

```javascript
{
  "dateOfDeath": "1994-10-15"
}
```

> Response body (application/json)

```javascript
{
  "message": "Mephyl Philip record have been updated",
  "updatedAuthor": {
    "fullName": "Mephyl Philip",
    "lifeSpan": 3742416000000,
    "id": 1,
    "firstName": "Mephyl",
    "lastName": "Philip",
    "dateOfBirth": "1876-03-12T00:00:00.000Z",
    "dateOfDeath": "1994-10-15T00:00:00.000Z",
    "createdAt": "2018-03-05T15:31:55.894Z",
    "updatedAt": "2018-03-05T15:33:21.380Z"
  }
}
```

This endpoint edits an author record.

### HTTP Request

`PUT /books/:authorId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
authorId | The ID of the book

## Get all authors and book(s) assigned

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "authors": [
    {
      "fullName": "Nelkon Parker",
      "id": 1,
      ...
      "Books": []
      },
      {
        "fullName": "Charles Philip",
        "id": 2,
        ...
        "Books": []
      }
  ]
}
```

This endpoint get all authors and assigned books.

### HTTP Request

`GET /books`

### HTTP Response

`200 OK`


## Get a single author 

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "author": [
    {
      "fullName": "Nelkon Parker",
      "id": 1,
      ...
      "Books": [ ]
    }
  ]
}
```

This endpoint gets a single author.

### HTTP Request

`GET /authors/:authorId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
authorId | The ID of the author

## Search for authors

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": "Author found",
  "author": [
    {
      "fullName": "Nelkon Parker",
      "id": 1,
      ...,
      "Books": [ ]
    }
  ]
}
```

This endpoint searches for an author

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
 The search query strings finds related words within authors full name and returns all occurrences
</aside>

## Delete an author

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "message": "Author removed successfully"
}
```

This endpoint deletes a single author by id.

### HTTP Request

`DELETE /authors/:authorId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
authorId | The ID of the author