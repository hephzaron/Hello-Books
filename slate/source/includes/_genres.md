# Genres

## Create a book genre

> Request body

```javascript
{
  "name": "Computer studies"
}
```

> Response body (application/json)

```javascript
{
  "message": "Computer studies have been added to category",
  "genre": {
    "id": 1,
    "name": "Computer studies",
    "updatedAt": "2018-03-05T14:07:08.990Z",
    "createdAt": "2018-03-05T14:07:08.990Z"
  }
}
```

This endpoint creates a book genre.

### HTTP Request

`POST /genre

### HTTP Response

`201 Created`

<aside class="notice">
 You need tto be registered/signed in as an administartor to perform this action
</aside>

## View all genres and assigned books

> Request body

```javascript
{}
```

> Response body (application/json)

```javascript
{
  "genres": [
    {
      "id": 1,
      "name": "Computer science",
      "createdAt": "2018-03-04T15:36:19.802Z",
      "updatedAt": "2018-03-04T15:36:19.802Z",
      "books": [
        {
          "id": 1,
          "title": "Java programming for beginners",
          "genre_id": 1,
           ...
        }
      ]},
      ...
    ]
}
```

This endpoint gets all book genres created with books assigned

### HTTP Request

`GET /genre/books`

### HTTP Response

`200 OK`
