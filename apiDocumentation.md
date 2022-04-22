## Endpoints

List of Available Endpoints:
- `POST /register`
- `POST /login`
- `GET /jobs`
- `GET /myapplications`
- `POST /myapplications`
- `POST /myapplications/payment`
- `DELETE /myapplications/:id`
- `PATCH /myapplications/:id`


## POST /register

### Description 
- Create a new user data

### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body 
    ```json
    { 
      "email": String, 
      "password": String, 
      "firstName": String, 
      "lastName": String,
      "location": String
    }
    ```

### Response

_201 - OK_
- Body 
    ```json
    {
      "id": Integer,
      "email": String,
      "fullName": String
      }
    }
    ```
_400 - Bad Request_
- Body
    ```json
    {
      "message": "Email must be unique"
    }

    OR

    {
      "message": "Email is required"
    }

    OR

    {
      "message": "Invalid email format"
    }

    OR

    {
      "message": "Password is required"
    }

    OR

    {
      "message": "Password length minimum are 8 characters"
    }

    OR

    {
      "message": "First name is required"
    }

    OR

    {
      "message": "Last name is required"
    }

    OR

    {
      "message": "Location is required"
    }
    ```
_500 - Internal Server Error_
- Body
    ```json
    {
      "message": "Internal Server Error"
    }
    ```


## POST /login

### Description 
- Check authentication user data

### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body 
    ```json
    {
      "email": String, 
      "password": String
    }
    ```

### Response

_200 - OK_
- Body 
    ```json
    {
      "access_token": String,
    }
    ```
_400 - Bad Request_
- Body
    ```json
    {
      "message": "Email is required"
    }

    OR

    {
      "message": "Password is required"
    }

_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Invalid email or password"
    }
    ```
_500 - Internal Server Error_
- Body
    ```json
    {
      "message": "Internal Server Error"
    }
    ```


## GET /jobs

### Description 
- Get all the jobs data

### Request
- Headers
    ```json
    {
      "access_token": String
    }

### Response
_200 - OK_
- Body 
    ```json
    [
      {
        "id": Integer,
        "role": String, 
        "company_name": String, 
        "company_num_employees": Integer, 
        "employment_type": String, 
        "location": String, 
        "remote": Boolean,
        "logo": String,
        "url": String,
        "text": String,
        "date_posted": Date,
        "keywords": [
          "hyper",
          "jira",
          "blockchain",
          ...  
        ],
        "source": String,
      },
        ...
    ]
    ```
_401 - Unauthorized_
- Body for wrong token
    ```json
    {
      "message": "Invalid token, please login again"
    }
    ```
- Body for deleted user
    ```json
    {
      "message": "User not found"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Job not found",
    }
    ```
_500 - Internal Server Error_
- Body
    ```json
    {
      "message": "Internal Server Error"
    }
    ```


## POST /myapplications

### Description 
- Create a new my application data

### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": String
    }
- Body 
    ```json
    {
      "jobId": Integer,
      "title": String, 
      "remote": Boolean, 
      "companyName": String, 
      "description": String, 
      "source": String, 
      "createdDate": Date,
      "status": String,
      "jobUrl": String,
    }
    ```

### Response

_201 - OK_
- Body 
    ```json
    {
      "id": Integer,
      "UserId": Integer,
      "jobId": Integer,
      "title": String, 
      "remote": Boolean, 
      "companyName": String, 
      "description": String, 
      "source": String, 
      "createdDate": Date,
      "status": String,
      "jobUrl": String,
    },
    ```
_400 - Bad Request_
- Body
    ```json
    {
      "message": "Job ID is required",
    }

    OR

    {
      "message": "Title job is required",
    }

    OR

    {
      "message": "Status remote is required",
    }

    OR

    {
      "message": "Company name is required",
    }

    OR

    {
      "message": "Description job is required",
    }

    OR

    {
      "message": "Source is required",
    }

    OR

    {
      "message": "Date created job is required",
    }

    OR

    {
      "message": "Link for job is required",
    }
    ```
_401 - Unauthorized_
- Body for wrong token
    ```json
    {
      "message": "Invalid token, please login again"
    }
    ```
- Body for deleted user
    ```json
    {
      "message": "User not found"
    }
    ```
_409 - Clashed_
- Body for duplicate application
    ```json
    {
      "message": "Application already added on MyApplications"
    }
    ```
- Body for maximum limit application already reached
    ```json
    {
      "message": "You already applied 3 applications, please finish them before applied another application"
    }
    ```
_500 - Internal Server Error_
- Body
    ```json
    {
      "message": "Internal Server Error"
    }
    ```


## POST /myapplications/payment

### Description 
- Ask user to do payment before applied application

### Request
- Headers
    ```json
    {
      "access_token": String
    }

### Response
_200 - OK_
- Body 
    ```json
    {
      "token": String,
    },
    ```
_401 - Unauthorized_
- Body for wrong token
    ```json
    {
      "message": "Invalid token, please login again"
    }
    ```
- Body for deleted user
    ```json
    {
      "message": "User not found"
    }
    ```
_500 - Internal Server Error_
- Body
    ```json
    {
      "message": "Internal Server Error"
    }
    ```


## GET /myapplications

### Description 
- Get all the my applications data

### Request
- Headers
    ```json
    {
      "access_token": String
    }

### Response
_200 - OK_
- Body 
    ```json
    [
      {
        "id": Integer,
        "UserId": Integer,
        "jobId": Integer,
        "title": String, 
        "remote": Boolean, 
        "companyName": String, 
        "description": String, 
        "source": String, 
        "createdDate": Date,
        "status": String,
        "jobUrl": String,
      },
        ...
    ]
    ```
_401 - Unauthorized_
- Body for wrong token
    ```json
    {
      "message": "Invalid token, please login again"
    }
    ```
- Body for deleted user
    ```json
    {
      "message": "User not found"
    }
    ```
_500 - Internal Server Error_
- Body
    ```json
    {
      "message": "Internal Server Error"
    }
    ```


## DELETE /myapplications/:id

### Description 
- Remove a my application data based on given my application id

### Request
- Headers
    ```json
    {
      "access_token": String
    }

### Response
_200 - OK_
- Body 
    ```json
    {
      "message": "Success deleted application with ID",
    }
    ```
_401 - Unauthorized_
- Body for wrong token
    ```json
    {
      "message": "Invalid token, please login again"
    }
    ```
- Body for deleted user
    ```json
    {
      "message": "User not found"
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "message": "Failed authorization"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Your application not found"
    }
    ```
_500 - Internal Server Error_
- Body
    ```json
    {
      "message": "Internal Server Error"
    }
    ```


## PATCH /myapplications/:id

### Description 
- Update a my application data based on given id and status my application

### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "access_token": String
    }
- Body 
    ```json
    {
      "status": String, 
    }
    ```

### Response
_200 - OK_
- Body 
    ```json
    {
      "id": Integer,
      "UserId": Integer,
      "jobId": Integer,
      "title": String, 
      "remote": Boolean, 
      "companyName": String, 
      "description": String, 
      "source": String, 
      "createdDate": Date,
      "status": String,
      "jobUrl": String,
    },
    ```
_401 - Unauthorized_
- Body for wrong token
    ```json
    {
      "message": "Invalid token, please login again"
    }
    ```
- Body for deleted user
    ```json
    {
      "message": "User not found"
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "message": "Failed authorization"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Your application not found"
    }
    ```
_500 - Internal Server Error_
- Body
    ```json
    {
      "message": "Internal Server Error"
    }
    ```