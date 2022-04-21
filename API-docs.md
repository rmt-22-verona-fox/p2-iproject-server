# API DOCUMENTATION

## Endpoints

List:

- `POST /register`
- `POST /login`
- `GET /surah`
- `GET /surah/:id`
- `GET /bookmarks`
- `POST /bookmarks/:id`
- `DELETE /bookmarks/:id`
- `GET /news`
- `GET /randomSurah`

## POST /register

---

_To create User_

## Request

- Body

```json
{

        "email": String,
        "password": String,

}
```

## Response

**200 Success**

```json
{
    "id": Integer,
    "email": String,

}
```

**400**
**Validation Errors**

```json

{
    "status": 400,
    "error": {
        "message": [
            [SequelizeValidationError]
        ]
    }
}
```

## POST /login

---

_To login_

## Request

- Body

```json
{
        "email": String,
        "password": String,
}
```

## Response

**200 Success**

```json
{

    "accessToken": String,

}
```

**401**
**Invalid token**

```json
{
  "status": 401,
  "error": {
    "message": "Please login first"
  }
}
```

**401**
**Invalid Password or Email**

```json
{
  "status": 401,
  "error": {
    "message": "email or password invalid"
  }
}
```

**403**
**Unauthorized**

```json
{
  "status": 403,
  "error": {
    "message": "Unauthorized"
  }
}
```

## GET /surah

---

_To get all surah data_

## Response

**200 Success**

```json
[
    {
        "number": Integer,
        "name": String,
        "translate": String,
        "verses": Integer,
        "arab": String
    },
]
```

## GET /surah/:id

---

_To get detail surah data_

## Response

**200 Success**

```json
{
    "name": String,
    "number": Integer,
    "arab": String,
    "tafsir": String,
    "translation": String,
    "verses": [
        {
            "ayat": Integer,
            "arab": String,
            "latin": String,
            "audio": String
        },
    ]
}
```

**404 Surah is Not Found**

```json
{
  "status": 404,
  "error": {
    "message": "Surah is Not Found"
  }
}
```

## GET /bookmarks

---

_To get all bookmarks data from login user_

## Request

- Headers

```json
{
        "access_token": String
}
```

## Response

**200 Success**

```json
[
    {
        "id": Integer,
        "number": Integer,
        "name": String,
        "translate": String,
        "verses": Integer,
        "arab": String
    },

]
```

**401**
**Invalid token**

```json
{
  "status": 401,
  "error": {
    "message": "Please login first"
  }
}
```

## POST /bookmarks/:id

---

_To add bookmarks data to login user_

## Request

- Headers

```json
{
        "access_token": String
}
```

## Response

**201 Success**

```json
{
  "message": "Success Add Bookmark"
}
```

**401**
**Invalid token**

```json
{
  "status": 401,
  "error": {
    "message": "Please login first"
  }
}
```

**404 Surah is Not Found**

```json
{
  "status": 404,
  "error": {
    "message": "Surah is Not Found"
  }
}
```

**400 Surah already bookmark**

```json
{
  "error": {
    "message": "User Already Bookmark This Surah"
  }
}
```

## DELETE /bookmarks/:id

---

_To delete bookmarks data to login user_

## Request

- Headers

```json
{
        "access_token": String
}
```

## Response

**201 Success**

```json
{
  "message": "Success Delete Bookmark"
}
```

**401**
**Invalid token**

```json
{
  "status": 401,
  "error": {
    "message": "Please login first"
  }
}
```

**404 Surah is Not Found**

```json
{
  "status": 404,
  "error": {
    "message": "Bookmark is Not Found"
  }
}
```

## GET /news

---

_To get all news related to islam_

## Response

**200 Success**

```json
{
    "status": "ok",
    "totalResults": Integer,
    "articles":[
        {
            "source": {
                "id": String,
                "name": String
            },
            "author": String,
            "title": String,
            "description": String,
            "url": String,
            "urlToImage": String,
            "publishedAt": String,
            "content": String
        }
    ]
}
```

## GET /randomSurah

---

_To get random surah_

## Response

**200 Success**

```json
{
    "surah": String,
    "ayat": Integer,
    "arab": String,
    "latin": String,
    "indonesia": String
}
```

## GLOBAL ERROR

## Response

**500 Internal Server Error**

```json
{
  "statusCode": 500,
  "error": {
    "message": "Internal Server Error",
    "description": String (description of an error message)
  }
}
```
