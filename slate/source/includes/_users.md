# Users

## Create a user

> Request body

```javascript
{ 
  "username": "username"
  "email": "myemail@email.com",
  "password": "password",
  "confirmPassword": "password"
}
```

> Response body (application/json)

```javascript
{
  "message": "Authentication successful",
  "user": {
    "username": "username",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","userId": 1,
    "admin": false
  }
}
```

This endpoint creates a user record.

### HTTP Request

`POST /users/register`

### HTTP Response

`200 OK`

## Send reset password

> Request body

```javascript
{
  "email": "myemail@email.com"
}
```

> Response body (application/json)

```javascript
{
  "message": "Password reset link sent to myemail12@email.com"
}
```

This endpoint sends a reset password link to the user associated with the provided email address

### HTTP Request

`POST /users/forgot_password`

### HTTP Response

`200 OK`

## Validate reset link

> Request body

```javascript
{}
```

> Response body (application/json)

```javascript
{
  "message": "Password reset successful, you can now change your password",
  "user": {
    "username": "username12",
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1,
    "admin": false
  }
}
```

This endpoint validates the reset link after the user has click on the reset password link and redirects user to change password

### HTTP Request

`POST /auth/reset-password/`

### HTTP Response

`200 OK`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
token | undefined | The reset token sent to user email

<aside class="notice">
The query parameter<code>token=ab653dbf704d6f70ec466a8b4395d4d8220dd...</code> is a randomly generates number
</aside>

## Change password 

> Request body

```javascript
{
  "newPassword": "new password",
  "confirmPassword": "new password"
}
```

> Response body (application/json)

```javascript
{
  "message": "Password change successful, please login to your account"
}
```

This endpoint is for authenticated users to change their password

### HTTP Request

`PUT /users/change_password`

### HTTP Response

`200 OK`

## Get all users

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "allUsers": [
    {
      "id": 1,
      "userId": "aeeb4adc-d1aa-4cc4-8941-d4f2425b00b1",
      "username": "username",
      "email": "myemail@email.com",
      "admin": false,
      "memValue": "platinum",
      "createdAt": "2018-03-04T15:38:11.476Z",
      "updatedAt": "2018-03-04T15:38:11.476Z"
    },
    ...
  ]
}
```

This endpoint gets all users 

### HTTP Request

`GET /users`

### HTTP Response

`200 OK`


## Get a single user

> Request body

```javascript
{ }
```

> Response body (application/json)

```javascript
{
  "user": {
    "id": 1,
    "userId": "aeeb4adc-d1aa-4cc4-8941-d4f2425b00b1",
    "username": "username",
    "email": "myemail@email.com",
    "admin": false,
    "memValue": "platinum",
    "createdAt": "2018-03-04T15:38:11.476Z",
    "updatedAt": "2018-03-04T15:38:11.476Z"
  }
}
```

This endpoint gets a single user 

### HTTP Request

`GET /users/:userId`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user

