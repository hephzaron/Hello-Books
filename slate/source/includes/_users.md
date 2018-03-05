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

`POST '/users/forgot_password'`

### HTTP Response

`200 OK`

## Change password on reset

> Request body

```javascript
{
  "email": "johndoe@email.com",
  "password": "new password",
  "confirmPassword": "new password",
  "validationKey": "dfghjkhg32ft4678u9dihbrfvbi3r"
}
```

> Response body (application/json)

```javascript
{
  "message": "Password successfully changed. Please login to your account."
}
```

This endpoint changes a user's password after the user has click on the reset password link

### HTTP Request

`POST /users/reset-password/verify`

### HTTP Response

`200 OK`

## Change password in profile

> Request body

```javascript
{
  "oldPassword": "old password",
  "password": "new password",
  "confirmPassword": "new password"
}
```

> Response body (application/json)

```javascript
{
  "message": "Your password has been changed successfully"
}
```

This endpoint is for authenticated users to changes their password

### HTTP Request

`PUT /users/:userId`

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
  "users": [
    {
      "createdAt": "2017-12-11T16:27:39.497Z"
      "email": "johndoe@email.com"
      "id": 1
      "name": "John Doe"
      "updatedAt": "2017-12-11T16:27:39.497Z"
      "userRank": "beginner"
    }
  ]
}
```

This endpoint gets all users or a particular user by id

### HTTP Request

`GET /users/[,:userId]`

### HTTP Response

`200 OK`

### URL Parameters

Parameter | Description
--------- | -----------
userId | The ID of the user

