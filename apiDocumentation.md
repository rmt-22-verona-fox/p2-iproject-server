# Travel10 - iProject

## Authentication API

---

1. **Create a new Customer**

`POST user/register`

**_Description_**

- Registering a new Customer

**_Request_**

- **Body**

```json
{
	"fullName": String,
	"email": String,
	"password": String,
}
```

**_Response_**

_201 - Created_

- **Body**

```json
{
    "id": Number,
    "fullName": String,
    "email": String
}
```

_400 - Bad Request_

- **Body**

```json
{
    "message": String
}
```

---

2. **Login registered Customer**

`POST user/login`

**_Description_**

- Sign in registered Customer

**_Request_**

- **Body**

```json
{
	"email": String,
	"password": String,
}
```

**_Response_**

_200 - OK_

- **Body**

```json
{
    "access_token": <your access token>,
    "profile": {
        "id": Number,
        "fullName": String,
        "email": String,
        "city": String,
        "bio": String,
        "profilePicture": String,
        "isVerified": Boolean
    }
}
```

_400 - Bad Request_

- **Body**

```json
{
  "message": "Email/password harus diisi"
}
```

_401 - Unauthorized_

- **Body**

```json
{
  "message": "Email/password salah"
}
```

---

3. **Verify new Customer email**

`POST user/verify`

**_Description_**

- Verification of new Customer Email

**_Request_**

- **Header**

```json
{
  "access_token": <your access token>
}
```

- **Body**

```json
{
	"verificationCode": <your verification code>,
}
```

**_Response_**

_200 - OK_

- **Body**

```json
{
  "message": "Email berhasil diverifikasi"
}
```

_400 - Bad Request_

- **Body**

```json
{
  "message": "Kode verifikasi harus diisi"
}
```

_400 - Bad Request_

- **Body**

```json
{
  "message": "Kode verifikasi salah"
}
```

---

## Package API

---

1. **Fetch all available package(no discount)**

`GET packages/all`

**_Description_**

- Getting all package data which is not on discount

**_Response_**

_200 - OK_

- **Body**

```json
[
  {
    "id": Number,
    "destinationName": String,
    "destinationCountry": String,
    "price": Number,
    "imageThumbnail": String,
    "imageUrls": Array,
    "description": String,
    "departureDate": String,
    "rating": Number,
    "reviewers": Number,
    "isPromo": false
  },
  ...
]
```

---

2. **Fetch all available package(w/ discount)**

`GET packages/promos`

**_Description_**

- Getting all package data which is on discount

**_Response_**

_200 - OK_

- **Body**

```json
[
  {
    "id": Number,
    "destinationName": String,
    "destinationCountry": String,
    "price": Number,
    "imageThumbnail": String,
    "imageUrls": Array,
    "description": String,
    "departureDate": String,
    "rating": Number,
    "reviewers": Number,
    "isPromo": true
  },
  ...
]
```

---

3. **Fetch all travel categories**

`GET packages/categories`

**_Description_**

- Getting all categories data

**_Response_**

_200 - OK_

- **Body**

```json
[
  {
    "id": Number,
    "name": String,
    "imageThumbnail": String,
  },
  ...
]
```

_500 - Internal Server Error_

- **Body**

```json
{
  "message": "Mongo DB connection error"
}
```

---

4. **Fetch all travel testimonies**

`GET packages/testimonies`

**_Description_**

- Getting all testimonies data

**_Response_**

_200 - OK_

- **Body**

```json
[
  {
    "id": Number,
    "fullName": String,
    "imageUrl": String,
    "city": String,
    "rating": Number,
    "review": String,
    "destination": String,
    "checkoutDate": String,
  },
  ...
]
```

_500 - Internal Server Error_

- **Body**

```json
{
  "message": "Mongo DB connection error"
}
```

---

5. **Post travel testimony**

`POST packages/testimonies`

**_Description_**

- Posting a travel testimony

- **Headers**

```json
{
  "access_token" : <your access token>
}
```

**_Request_**

- **Body**

````json

{
    "fullName": String,
    "imageUrl": String,
    "city": String,
    "rating": Number,
    "review": String,
    "destination": String,
    "checkoutDate": String,
}

**_Response_**

_200 - OK_

- **Body**

```json
{
  "acknowledged": true,
  "insertedId": Number
}
````

_500 - Internal Server Error_

- **Body**

```json
{
  "message": "Mongo DB connection error"
}
```

---

6. **Fetch a specific package**

`GET packages/:id`

**_Description_**

- Getting a specific package data

**_Response_**

_200 - OK_

- **Body**

```json
{
  "id": Number,
  "destinationName": String,
  "destinationCountry": String,
  "price": Number,
  "imageThumbnail": String,
  "imageUrls": Array,
  "description": String,
  "departureDate": String,
  "rating": Number,
  "reviewers": Number,
  "isPromo": false
},
```

_404 - Not Found_

- **Body**

```json
{
  "message": "Data not found"
}
```

---

## Transaction API

---

- **Headers**

```json
{
  "access_token" : <your access token>
}
```

1. **Fetch all paid transaction history**

`GET /profile`

**_Description_**

- Getting all paid transaction data

**_Response_**

_200 - OK_

- **Body**

```json
{
  "id": Number,
  "UserId": Number,
  "PackageId": Number,
  "checkoutDate": Number,
  "quantity": Number,
  "paymentStatus": true,
  "Package": {
    "id": Number,
    "destinationName": String,
    "destinationCountry": String,
    "price": Number,
    "imageThumbnail": String,
    "imageUrls": Array,
    "description": String,
    "departureDate": String,
    "rating": Number,
    "reviewers": Number,
    "isPromo": Boolean
  }
}
```

_200 - OK_

- **Body**

```json
{
  "message": "Kamu belum pernah melakukan perjalanan bersama Travel10"
}
```

---

2. **Create a checkout**

`POST profile/checkout`

**_Description_**

- Create a new package checkout

**_Request_**

- **Body**

```json
{
	"UserId": Integer,
  "PackageId": Integer,
  "checkoutDate": Date,
  "paymentStatus": true,
}
```

**_Response_**

_200 - OK_

- **Body**

```json
{
  "id": Integer,
  "UserId": Integer,
  "PackageId": Integer,
  "quantity": Integer,
  "paymentStatus": true,
  "checkoutDate": Date,
  "updatedAt": Date,
  "createdAt": Date,
}
```

_403 - Forbidden_

- **Body**

```json
{
  "message": "Kamu belum melakukan verifikasi email"
}
```

---

3. **Make a payment**

`POST profile/payment`

**_Description_**

- Finish a payment

**_Request_**

- **Body**

```json
{
	"amount": Integer,
  "fullName": String,
  "email": String,
}
```

**_Response_**

_200 - OK_

- **Body**

```json
{
  "token": <Midtrans payment gateway token>,
  "redirect_url": <Midtrans payment gateway redirect url>,
}
```

_403 - Forbidden_

- **Body**

```json
{
  "message": "Kamu belum melakukan verifikasi email"
}
```

---

## Global Error

---

**_Response_**

_401 - Unauthorized_

- **Body**

```json
{
  "message": "Invalid token"
}
```

_500 - Internal Server Error_

- **Body**

```json
{
  "message": "Internal Server Error"
}
```
