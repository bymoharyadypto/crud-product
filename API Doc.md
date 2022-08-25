# My Assets NodeJs-ExpressJs Server

My Assets NodeJs-ExpressJs is an application to manage your assets, this app has:

    * RESTful endpoint for asset's CRUD operation
    * JSON formatted response


# RESTful endpoint for Product


### POST /register

- Request Header
```js
    { not needed }
```
- Request Body
```js
{
    "first_name": "budi",
    "last_name": "ali",
    "email": "budi@mail.com",
    "password": "12345",
}
```
- Response (201 - Success POST REGISTER)
```js
{
    "id": 1,
    "email": "budi@mail.com"
}
```
- Response (409 - Bad Request)
```js
{
    "message": [
        "Email is already used"
    ]
}
```

- Response (500 - Not Found)
```js
{
    message: [
        "Internal server error"
    ]
}
```



### POST /sign-in

- Request Header
```js
    { not needed }
```

- Request Body
```js
{
    "email": "budi@mail.com",
    "password": "12345"
}
```

- Response (200 - Success POST SIGN-IN)
```js
{
    "access_token" : "<your access token>"
}
```

- Response (401 - Bad Request)
```js
{
    "message": "Email or Password Not Found"
}
```

- Response (401 - Unauthorized)
```js
{
    "message": "Invalid Password"
}
```

- Response (500 - Not Found)
```js
{
    "message": "Internal Server Error"
}
```



### GET /products

- Request Header
```js
{
    "access_token" : "<your access token>"
}
```

- Request Body
```js
    { not needed }
```

- Response (200 - Success GET Products)
```js
{
    "totalItems": 5,
    "products": [
        {
            "id": 2,
            "kode_produk": 110,
            "nama_produk": "Celana",
            "qty": 300,
            "image_produk": "img-celana",
            "createdAt": "2022-08-25T10:20:53.720Z",
            "updatedAt": "2022-08-25T11:16:50.478Z"
        },
        {
            "id": 4,
            "kode_produk": 111,
            "nama_produk": "Baju",
            "qty": 200,
            "image_produk": "image-baju",
            "createdAt": "2022-08-25T11:22:21.864Z",
            "updatedAt": "2022-08-25T11:22:21.864Z"
        },
        {
            "id": 5,
            "kode_produk": 112,
            "nama_produk": "Kaos",
            "qty": 200,
            "image_produk": "image-kaos",
            "createdAt": "2022-08-25T11:22:38.963Z",
            "updatedAt": "2022-08-25T11:22:38.963Z"
        },
        {
            "id": 6,
            "kode_produk": 113,
            "nama_produk": "Topi",
            "qty": 200,
            "image_produk": "image-topi",
            "createdAt": "2022-08-25T11:22:54.897Z",
            "updatedAt": "2022-08-25T11:22:54.897Z"
        }
    ],
    "totalPages": 2,
    "currentPage": 1
}
```

- Response (401 - Unauthorized)
```js
{
    "message": "Missing Access Token"
}
```

- Response (404 - Bad Request)
```js
{
    "message": "Data Not Found"
}
```

- Response (500 - Internal Server Error)
```js
{
    "message": "Internal Server Error"
}
```



### GET /products?nama_produk=kaos

- Request Header
```js
{
    "access_token" : "<your access token>"
}
```

- Request Query Params
```js
    {
        "nama_produk": "kaos"
    }
```

- Request Body
```js
    { not needed }
```

- Response (200 - Success GET Product by Query)
```js
{
    "totalItems": 2,
    "products": [
        {
            "id": 5,
            "kode_produk": 112,
            "nama_produk": "Kaos",
            "qty": 200,
            "image_produk": "image-kaos",
            "createdAt": "2022-08-25T11:22:38.963Z",
            "updatedAt": "2022-08-25T11:22:38.963Z"
        },
        {
            "id": 8,
            "kode_produk": 114,
            "nama_produk": "Kaos Kaki",
            "qty": 200,
            "image_produk": "image-kaos-kaki",
            "createdAt": "2022-08-25T11:23:27.868Z",
            "updatedAt": "2022-08-25T11:23:27.868Z"
        }
    ],
    "totalPages": 1,
    "currentPage": 1
}
```

- Response (401 - Unauthorized)
```js
{
    "message": "Missing Access Token"
}
```

- Response (404 - Bad Request)
```js
{
    "message": "Data Not Found"
}
```

- Response (500 - Internal Server Error)
```js
{
    "message": "Internal Server Error"
}
```



### POST /product

- Request Header
```js
{
    "access_token" : "<your access token>"
}
```

- Request Body
```js
{
    "kode_produk": 114,
    "nama_produk": "Kaos Kaki",
    "qty": 200,
    "image_produk": "image-kaos-kaki"
}
```

- Response (201 - Success POST Product)
```js
{
    "id": 8,
    "kode_produk": 114,
    "nama_produk": "Kaos Kaki",
    "qty": 200,
    "image_produk": "image-kaos-kaki",
    "updatedAt": "2022-08-25T11:23:27.868Z",
    "createdAt": "2022-08-25T11:23:27.868Z"
}
```

- Response (401 - Unauthorized)
```js
{
    "message": "Missing Access Token"
}
```

- Response (400 - Bad Request)
```js
{
    "message": [
        "nama produk cannot be empty string"
    ]
}
```

- Response (400 - Bad Request)
```js
{
    "message": [
        "kode_produk must be unique"
    ]
}
```

- Response (500 - Not Found)
```js
{
    message: [
        "Internal server error"
    ]
}
```



### PUT /product/:id

- Request Header
```js
{
    "access_token" : "<your access token>"
}
```

- Request Body
```js
{
    "kode_produk": 110,
    "nama_produk": "Celana",
    "qty": 300,
    "image_produk": "img-celana"
}
```

- Response (200 - Success Update Product By Id)
```js
{
    "message": "product has been updated"
}
```

- Response (401 - Unauthorized)
```js
{
    "message": "Missing Access Token"
}
```

- Response (404 - Not Found)
```js
{
    "message": "Data Not Found"
}
```

- Response (500 - Internal Server Error)
```js
{
    message: "Internal server error"
}
```




### DELETE /product/:id

- Request Header
```
{
    "access_token" : "<your access token>"
}
```

- Request Body
```
    not needed
```

- Response (200 - Success DELETE Product By Id)
```js
{
    "message": "kode produk 111 has been deleted"
}
```

- Response (401 - Unauthorized)
```js
{
    "message": "Missing Access Token"
}
```

- Response (404 - Not Found)
```js
{
    "message": "Data Not Found"
}
```

- Response (500 - Internal Server Error)
```js
{
    message: "Internal server error"
}
```