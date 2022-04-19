## Endpoints

List of Available Endpoints:

- `GET / food`
- `Post / food`
- `Delete / food/:id`
- `Put / food/:id`
- `Post / user/register`
- `Post / user/login`
- `Post / user/authGoogle`

### GET /food

#### Description

-Get all the food data

#### Response

_200 - OK_

- Body
  ```json
  {
      "statusCode" : 200,
      "data": [
          {
              "id":Integer,
              "name":String,
              "description":String,
              "price":Integer,
              "imgUrl":String,
              "authorId":Integer,
              "categoryId":Integer,
              "createdAt":Date,
              "updatedAt":Date
          },
          ...
      ]
  }
  ```

### Post / food

#### Description

-Create a new food

#### Request

- Headers
  ```json
  {
    "Content-type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "name":String,
    "description":String,
    "price":Integer,
    "imgUrl":String,
    "categoryId":Integer,
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
      "statusCode" : 201,
      "message" : "Food created succesfully",
      "data":{
        "id":Integer,
        "name":String,
        "description":String,
        "price":Integer,
        "imgUrl":String,
        "authorId":Integer,
        "categoryId":Integer,
        "createdAt":Date,
        "updatedAt":Date
          },


  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
      "statusCode" : 400,
      "error":{
              "message":String,
          },

  }
  ```

### Delete /food/:id

#### Description

- Remove food data based on given id

#### Response

_200 - Ok_

- Body

  ```json
  {
    "statusCode": 200,
    "message": "Food {id} delete succesfully"
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "statusCode": 400,
    "error": {
      "message": "Food not found"
    }
  }
  ```

### Put /food/:id

#### Description

- Update food data based on given id

#### Response

_200 - Ok_

- Body

  ```json
  {
    "statusCode": 200,
    "data":{
    "id":Integer,
    "name":String,
    "address":String,
    "zipCode":String,
    "createdAt":Date,
    "updatedAt":Date
          },
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "statusCode": 400,
    "error": {
      "message": "Food not found"
    }
  }
  ```

### Post / register

#### Description

-Create a new user

#### Request

- Headers
  ```json
  {
    "Content-type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email":String,
    "password":String,
    "role":String,
    "phone":String,
    "address":String,
    "username":String,
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
      "statusCode" : 201,
      "message" : "user created succesfully",
      "data":{
        "id":Integer,
        "email":String,
        "password":String,
        "role":String,
        "phone":String,
        "address":String,
        "username":String,
        "createdAt":Date,
        "updatedAt":Date
          },


  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
      "statusCode" : 400,
      "error":{
              "message":String,
          },

  }
  ```

### Post / login

#### Description

-log in

#### Request

- Headers
  ```json
  {
    "Content-type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email":String,
    "password":String,
  }
  ```

#### Response

_200 - Ok_

- Body

  ```json
  {
      "statusCode" : 200,
      "access_token":String

  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "statusCode": 400,
    "error": {
      "message": "Invalid email or password"
    }
  }
  ```

  ### Post / authGoogle

#### Description

-log in Via Google

#### Request

googleUser.getAuthResponse().id_token

#### Response

_200 - Ok_

- Body

  ```json
  {
      "statusCode" : 200,
      "access_token":String

  }
  ```

_redirect_uri_mismatch_

### Global Error

#### Response

_500 - Internal Server Error_
