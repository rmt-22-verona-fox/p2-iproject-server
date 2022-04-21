## Endpoints

list of Availiable Endpoints:

- `GET /youtube/dribble`
- `GET /youtube/passing`
- `GET /youtube/finishing`
- `GET /youtube/shooting`
- `GET /youtube/footwork`
- `POST /nba/games`
- `POST /nba/seasons`
- `POST /nba/standings`

### GET /youtube/dribble

#### Description

- Get all basketball dribble drill youtube data

#### Response

_200 - OK_

```json
[
  {
    "videoId": String,
    "thumbnail": String,
    "videoInfo": {
      "title": String,
      "description": String,
      "publishedBy": String,
      "publishedAt": Date
    }
  },
    ...
]
```

### GET /youtube/passing

#### Description

- Get all basketball passing drill youtube data

#### Response

_200 - OK_

- Body

```json
[
  {
    "videoId": String,
    "thumbnail": String,
    "videoInfo": {
      "title": String,
      "description": String,
      "publishedBy": String,
      "publishedAt": Date
    }
  },
    ...
]
```

### GET /youtube/finishing

#### Description

- Get all basketball finishing drill youtube data

#### Response

_200 - OK_

```json
[
  {
    "videoId": String,
    "thumbnail": String,
    "videoInfo": {
      "title": String,
      "description": String,
      "publishedBy": String,
      "publishedAt": Date
    }
  },
    ...
]
```

### GET /youtube/shooting

#### Description

- Get all basketball shooting drill youtube data

#### Response

_200 - OK_

```json
[
  {
    "videoId": String,
    "thumbnail": String,
    "videoInfo": {
      "title": String,
      "description": String,
      "publishedBy": String,
      "publishedAt": Date
    }
  },
    ...
]
```

### GET /youtube/footwork

#### Description

- Get all basketball footwork drill youtube data

#### Response

_200 - OK_

```json
[
  {
    "videoId": String,
    "thumbnail": String,
    "videoInfo": {
      "title": String,
      "description": String,
      "publishedBy": String,
      "publishedAt": Date
    }
  },
    ...
]
```

### POST /nba/games

#### Description

- Generate NBA games data 

#### Request

### headers

```json
{
  "season": Integer,
  "date": Date
}
```

#### Response

_200 - OK_

```json
[
  {
    "season": String,
    "start": String,
    "status": {
      "clock": integer,
      "long": String,
      "currentPeriods": Integer,
      "totalPeriods": Integer
    },
    "arena": {
      "name": String,
      "city": String,
      "state": String,
      "country": String
    },
    "visitors": {
      "name": String,
      "code": String,
      "logo": String,
      "points": Integer,
      "linescore": [String],
      "statistics": {
        "win": Integer,
        "loss": Integer,
        "h2hWin": Integer,
        "h2hLoss": Integer
      }  
    },
    "home": {
      "name": String,
      "code": String,
      "logo": String,
      "points": Integer,
      "linescore": [String],
      "statistics": {
        "win": Integer,
        "loss": Integer,
        "h2hWin": Integer,
        "h2hLoss": Integer
      }
    }
  },
    ...
]
```
### POST /nba/standings

#### Description

- Generate NBA standings data 

#### Request

### headers

```json
{
  "season": Integer,
  "conference": String
}
```

#### Response

_200 - OK_

```json
[
  {
    "rank": Integer,
    "win": {
      "home": Integer,
      "away": Integer,
      "total": Integer,
      "percentage": String,
      "lastTen": Integer
    },
    "loss": {
      "home": Integer,
      "away": Integer,
      "total": Integer,
      "percentage": String,
      "lastTen": Integer
    },
    "team": {
      "name": String,
      "code": String,
      "logo": String
    }
  },
    ...
]
```

### GET /nba/seasons

#### Description

- Get NBA seasons data 

#### Response

_200 - OK_

```json
[String]
```

### Global Error

#### Response

_400 - Bad Request_
- Body

```json
{
    "message": "Bad Request"
}
```

_500 - Internal Server Error_
- Body

```json
{
    "message": "Internal Server Error"
}
```