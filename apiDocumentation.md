## Models
Customers
- email (String)
- password (String)
- phoneNumber (Integer)
- address (String)

Tickets


## Endpoints

List of Available Endpoints:
- `GET /hotel`
- `POST /register`
- `POST /login`
- `POST /booking`
- `GET /customers`
- `POST /payment`

### GET /hotel
#### Description
- Get all the hotel data

#### Request
- Headers
    ```json
    {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        "X-RapidAPI-Key": "253d42d414msh4d146002ed12dbbp1cf8bcjsn5a561bb3fd3a"
    }
- Params
    ```json
    {
        "bl_latitude": -6.2285516719505996,
        "bl_longitude": 106.9505701840796,
        "tr_latitude": 106.9505701840796,
        "tr_longitude": -6.2285516719505996
    }
    ```

#### Response
_200 - OK_

- Body
    ```json
    {
        "data": [
            {
                "location_id": "13327668",
                "name": "eL Hotel Royale Jakarta",
                "latitude": "-6.152249",
                "longitude": "106.895805",
                "num_reviews": "921",
                "timezone": "Asia/Jakarta",
                "location_string": "Jakarta, Java",
                "photo": {
                    "images": {
                        "small": {
                            "width": "150",
                            "url": "https://media-cdn.tripadvisor.com/media/photo-l/09/6c/e2/53/grand-whiz-hotel-kelapa.jpg",
                            "height": "150"
                        },
                        "thumbnail": {
                            "width": "50",
                            "url": "https://media-cdn.tripadvisor.com/media/photo-t/09/6c/e2/53/grand-whiz-hotel-kelapa.jpg",
                            "height": "50"
                        },
                        "original": {
                            "width": "2000",
                            "url": "https://media-cdn.tripadvisor.com/media/photo-o/09/6c/e2/53/grand-whiz-hotel-kelapa.jpg",
                            "height": "1333"
                        },
                        "large": {
                            "width": "550",
                            "url": "https://media-cdn.tripadvisor.com/media/photo-s/09/6c/e2/53/grand-whiz-hotel-kelapa.jpg",
                            "height": "367"
                        },
                        "medium": {
                            "width": "250",
                            "url": "https://media-cdn.tripadvisor.com/media/photo-f/09/6c/e2/53/grand-whiz-hotel-kelapa.jpg",
                            "height": "167"
                        }
                    },
                    "is_blessed": true,
                    "uploaded_date": "2015-11-04T23:16:07-0500",
                    "caption": "Swimming Pool",
                    "id": "158130771",
                    "helpful_votes": "1",
                    "published_date": "2015-11-04T23:16:07-0500",
                    "user": {
                        "user_id": null,
                        "member_id": "0",
                        "type": "user"
                    }
                },
                "awards": [
                    {
                        "award_type": "CERTIFICATE_OF_EXCELLENCE",
                        "year": "2021",
                        "images": {
                            "small": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_small-0-5.jpg",
                            "large": "https://www.tripadvisor.com/img/cdsi/img2/awards/CERTIFICATE_OF_EXCELLENCE_2021_en_US_large-0-5.jpg"
                        },
                        "categories": [],
                        "display_name": "Certificate of Excellence 2021"
                    }
                ],
                "preferred_map_engine": "default",
                "autobroaden_type": "category_integrated",
                "autobroaden_label": "Jakarta Places to Stay",
                "raw_ranking": "4.739090442657471",
                "ranking_geo": "Jakarta",
                "ranking_geo_id": "294229",
                "ranking_position": "1",
                "ranking_denominator": "2424",
                "ranking_category": "hotel",
                "ranking": "#1 Best Value of 2,424 places to stay in Jakarta",
                "subcategory_type": "hotel",
                "subcategory_type_label": "Hotel",
                "distance": "2.7161129913507196",
                "distance_string": null,
                "bearing": "northwest",
                "rating": "4.0",
                "is_closed": false,
                "is_long_closed": false,
                "price_level": "$",
                "price": "$22 - $40",
                "hotel_class": "3.5",
                "hotel_class_attribution": "This property is classified according to Giata.",
                "business_listings": {
                    "desktop_contacts": [],
                    "mobile_contacts": [
                        {
                            "value": "https://www.tripadvisor.com/Commerce?p=TABAIndependentHotels&src=0&geo=13327668&from=api&area=&slot=2&matchID=1&oos=0&cnt=1&silo=30355&bucket=875169&ubucket=875169&nrank=1&crank=1&clt=CLM&tm=230299566&managed=false&capped=false&gosox=5_3Y6UYwwGjgw_c7hEwIkbCkd-TOepL1JlIIVY84GhUUpCCdvb3okh-3xiplqIvS96VqQHa73q7pxGa8MKNdcQ&bapid=2&cs=1d9c539a8bd84f33fed6700d3bd5be72d",
                            "label": "Hotel website",
                            "type": "url"
                        }
                    ]
                },
                "special_offers": {
                    "desktop": [],
                    "mobile": []
                },
                "listing_key": "db655adb-e357-4f44-8b10-85e939cd82d1"
            },
            ...
        ]
    }
    ```

### POST /register
#### Description
- Register new customer

#### Request
- Headers
    ```json
    {
        "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
        "email": "madarauchiha@mail.com",
        "password": "1234sdfw",
        "phoneNumber": "087823478264",
        "address": "Jalan Konoha No. 33"
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
        "id": 1,
        "email": "madarauchiha@mail.com"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
        "message": [
            "Username is required",
            "Your email format is invalid",
            ...
        ]
    }
    ```

### POST /login
#### Description
- customer login

#### Request
- Headers
    ```json
    {
        "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
    {
        "email": "madarauchiha@mail.com",
        "password": "1234sdfw",
    }
    ```
#### Response
_200 - OK_
- Body
    ```json
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJzYXN1a2V1Y2hpaGEiLCJlbWFpbCI6InNhc3VrZXVjaGloYUBtYWlsLmNvbSIsImlhdCI6MTY0ODU3MTc3MSwiZXhwIjoxNjQ4NTc4OTcxfQ.8A2bypRwb2NRj6FbKmZc31QR9Llf395T0FkizPVQakA"
    }
    ```

_401 - Unauthorized_
- Body
    ```json
    {
        "message": "Invalid email or password"
    },
    OR
    {
        "message": "Email is requirde"
    },
    OR
    {
        "message": "Password is required"
    }
    ```

### POST /booking
#### Description
- Create booking ticket for customer

#### Request
- Headers
    ```json
    {
        "Content-Type": "application/x-www-form-urlencoded",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQG1haWwuY29tIiwiaWF0IjoxNjUwNDk4MTc5fQ.whw83uwZjSAMMGKbqxHFYr-it-hyOfK0mjWRV6aoayg"
    }
- Body
    ```json
    {
        "hotel": "Harris",
        "lat": -6.387945,
        "lng": 106.9488953,
        "price": 387547345,
        "roomType": "suites",
        "hotelClass": 4,
        "checkIn": "04/20/2022",
        "checkOut": "04/20/2022"
    }
    ```

### POST /payment
#### Description
- Create payment using midtrans

#### Request
- Headers
    ```json
    {
        "Content-Type": "application/x-www-form-urlencoded",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQG1haWwuY29tIiwiaWF0IjoxNjUwNDk4MTc5fQ.whw83uwZjSAMMGKbqxHFYr-it-hyOfK0mjWRV6aoayg"
    }

#### Response
_201 - Created_
- Body
    ```json
    {
        "token": "4eb76b2b-1f72-465d-a9da-399a4d579073"
    }
    ```

### Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
        "statusCode": 500,
        "error": {
            "message": "Internal Server Error"
        }
    }
    ```