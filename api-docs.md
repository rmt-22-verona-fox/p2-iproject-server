# Endpoints
## List of Available Endpoints:
- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /mypokemons`
- `POST /mypokemons/:PokemonId`
- `PUT /mypokemons/trade`

## POST /register
### Description:
Create new user.

### Request
- Headers
```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body
```json
{
  "email": String,
  "password": String,
}
```

### Response
_201 - Created_
- Body
```json
{
  "id": Integer,
  "email": String,
}
```

_400 - Bad Request_
- Body
```json
{
  "message": String,
}
```

## POST /login
### Description
Log in user.

### Request
- Headers
```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

- Body
```json
{
  "email": String,
  "password": String,
}
```

### Response
_200 - OK_
- Body
```json
{
  "access_token": String,
  "id": Integer,
  "email": String,
}
```

_401 - Unauthorized_
- Body
```json
{
  "message": "Invalid email/password"
}
```

## POST /googleLogin
### Description
Login user with Google Account.

### Request
- Body
```json
{
  "token": String,
}
```

### Response
_200 - OK_
- Body
```json
{
  "access_token": String,
  "id": Integer,
  "email": String,
}
```

## GET /mypokemons
### Description
Get list of user's pokemons.

### Request
- Headers
```json
{
  "access_token": String
}
```

### Response
_200 - OK_
- Body
```json
[
  {
    "id": 1,
    "UserId": 1,
    "PokemonId": 3,
    "createdAt": "2022-04-20T02:16:58.588Z",
    "updatedAt": "2022-04-20T02:16:58.588Z",
    "detail": {
      "id": 3,
      "url": "https://pokeapi.co/api/v2/pokemon/3",
      "name": "venusaur",
      "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      "types": [
        "grass",
        "poison"
      ],
      "stats": [
        80,
        82,
        83,
        100,
        100,
        80
      ]
  }
  },
]
```

_401 - Unauthorized_
- Body
```json
{
  "message": "Invalid token"
}
```

## POST /mypokemons/:PokemonId
### Description
Add pokemon to user's pokemon.

### Request
- Headers
```json
{
  "access_token": String
}
```

- Params
```json
{
  "PokemonId": Integer
}
```

### Response
_200 - OK_
- Body
```json
{
  "id": 6,
  "UserId": 1,
  "PokemonId": 15,
  "updatedAt": "2022-04-20T02:58:09.070Z",
  "createdAt": "2022-04-20T02:58:09.070Z",
  "detail": {
    "id": "15",
    "url": "https://pokeapi.co/api/v2/pokemon/15",
    "name": "beedrill",
    "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png",
    "types": [
      "bug",
      "poison"
    ],
    "stats": [
      65,
      90,
      40,
      45,
      80,
      75
    ]
  }
}
```

_401 - Unauthorized_
- Body
```json
{
  "message": "Invalid token"
}
```

_404 - Not Found_
- Body
```json
{
  "message": "Data not found"
}
```

## POST /mypokemons/:PokemonId
### Description
Add pokemon to user's pokemon.

### Request
- Headers
```json
{
  "access_token": String
}
```

- Body
```json
{
  "firstUserId": Integer,
  "firstPokemonId": Integer,
  "secondUserId": Integer,
  "secondPokemonId": Integer,
}
```

### Response
_200 - OK_
- Body
```json
[
  {
    "id": 19,
    "UserId": 1,
    "PokemonId": 29,
    "updatedAt": "2022-04-20T22:59:07.892Z",
    "createdAt": "2022-04-20T22:59:07.892Z"
  },
  {
    "id": 20,
    "UserId": 2,
    "PokemonId": 6,
    "updatedAt": "2022-04-20T22:59:07.909Z",
    "createdAt": "2022-04-20T22:59:07.909Z"
}
]

```

_401 - Unauthorized_
- Body
```json
{
  "message": "Invalid token"
}
```

## Global Error
### Response
403 - Forbidden_
- Body
```json
{
  "message": "You are not authorized"
}
```
### Response
_500 - Internal Server Error_
- Body
```json
{
  "message": "Internal server error"
}
```
