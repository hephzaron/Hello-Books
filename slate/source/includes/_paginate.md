This can be applied to 
- Search api <code>`GET /search`</code>
- Get books api <code>`GET /books`</code>
- Get authors api <code>`GET /authors`</code>

<aside class="notice">
 This offers user the flexibility of <code>fetching or searching books/authors</code> record in batches
</aside>

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "book": [
    {
      "id": 4,
      "title": "Java programming for beginners",
      "genre_id": 1,
      "description": "This introduces readers to the basic of Object Oriented Programmng Language",
      ...
      "Authors": []
    }
  ]
}
```

This endpoint fetches records from database in pages.

### HTTP Request

`GET /{books,authors, search}`

### HTTP Response

`200 OK`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
count | undefined | Sets the maximum records that can be fetched per request
page | undefined | Specifies the page of required sets of record
