# Wallety

Wallety is an Express.js-based financial management application.
It provides a robust backend for handling wallets, users, and transactions efficiently.

## Features

- Manage wallets and perform transactions
- User registration and authentication
- Well-structured routing and controllers for scalability

---

## INSTALLATION

- Clone the repository: git clone https://github.com/charlesaloaye/wallety.git
- Navigate to the project directory: cd wallety or drag and drop inside vscode
- Install the dependencies: npm i or npm install; to install all dependecies

---

## env SET UP

- Create an .env file and add the following
- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME
- PORT
- AUTH_SECRET_KEY

---

## USAGE

- Open your terminal `ctrl + shift ~ ` or `cmd + shift !`
- Type npm run server and press enter
- After that open your rest API client e.g Postman and follow the API doc

---

## API Documentation

### Wallet Endpoints

#### **`GET /wallets`**

- **Description**: Retrieves a list of all wallets.
- **Response**:
  - **Status Code**: `200 OK`
  - **Example Response**:
  ```json
  {
    "message": "wallet found",
    "wallets": [
      {
        "id": 1,
        "user_id": 2,
        "type_id": 1,
        "name": "USD",
        "balance": 4998000,
        "created_at": "2025-01-20T16:47:39.000Z"
      },
      {
        "id": 2,
        "user_id": 1,
        "type_id": 1,
        "name": "USD",
        "balance": 3100,
        "created_at": "2025-01-21T09:56:26.000Z"
      }
    ]
  }
  ```

#### **`POST /wallets/send`**

- **Description**: Processes a transaction to send funds from one wallet to another.
- **Request Body**:
  ```json
  {
    "message": "Transaction successfull",
    "data": {
      "sender_email": "test1@gmail.com",
      "receiver_email": "test2@gmail.com",
      "amount": "500",
      "wallet": "USD"
    }
  }
  ```
- **Response**:

  - **Status Code**:
    - `200 OK` if successful
    - `400 Bad Request` if there is insufficient balance or invalid input
  - **Example Responses**:
    - **Success**:

  ```json
  {
    "message": "Transaction successfull",
    "data": {
      "senderId": 2,
      "receiverId": 1,
      "amount": "500",
      "currency": "USD"
    }
  }
  ```

  - **Failure**:
    ```json
    {
      "message": "Insufficient balance"
    }
    ```

#### **`GET /wallets/:id`**

- **Description**: Retrieves details of a specific wallet by its ID.
- **Response**:
  - **Status Code**:
    - `200 OK` if the wallet is found
    - `404 Not Found` if the wallet does not exist
  - **Example Responses**:
    - **Success**:

```json
{
  "message": "wallet found",
  "wallets": [
    {
      "full_name": "Charles Techy",
      "email": "test1@gmail.com",
      "wallet_id": 1,
      "available_balance": 4996000,
      "wallet_type_id": 1,
      "wallet_user_id": 2,
      "wallet_type": "USD"
    }
  ]
}
```

- **Failure**:
  ```json
  {
    "message": "No wallet found"
  }
  ```

### User Endpoints

#### **`GET /users`**

- **Description**: Retrieves a list of all registered users.
- **Response**:
  - **Status Code**: `200 OK`
  - **Example Response**:

```json
{
  "message": "retrieved",
  "users": [
    {
      "id": 1,
      "name": "Charles Aloaye",
      "email": "test1@gmail.com",
      "created_at": "2025-01-20T15:15:57.000Z"
    },
    {
      "id": 2,
      "name": "Charles Techy",
      "email": "test2@gmail.com",
      "created_at": "2025-01-20T16:18:10.000Z"
    }
  ]
}
```

#### **`GET /users/:email`**

- **Description**: Retrieves a specific user by their email address.
- **Response**:
  - **Status Code**:
    - `200 OK` if the user is found
    - `404 Not Found` if the user does not exist
  - **Example Responses**:
    - **Success**:

```json
{
  "message": "retrieved",
  "users": [
    {
      "id": 1,
      "name": "Charles Aloaye",
      "email": "test1@gmail.com",
      "created_at": "2025-01-20T15:15:57.000Z"
    }
  ]
}
```

- **Failure**:

```json
{
  "message": "User Not found"
}
```

#### **`POST /users/register`**

- **Description**: Registers a new user.
- **Request Body**:

  ```json
  {
    "message": "Account created successfully, please login",
    "data": {
      "name": "Ade Tobi",
      "email": "test3@gmail.com",
      "password": "$2b$10$XZfNbppLnjC6fgkBnEBccOHdAkdy04yNa01jJdKYBDUwINrUoR9qa"
    }
  }
  ```

- **Response**:
  - **Status Code**:
    - `200 Created` if registration is successful
    - `401 Bad Request` if validation fails (e.g., email already exists)
  - **Example Responses**:
    - **Success**:
      ```json
      {
        "message": "User registered successfully",
        "userId": "123"
      }
      ```
    - **Failure**:

```json
{
  "message": "Account already exist, please try another email"
}
```

#### **`POST /users/login`**

- **Description**: Authenticates a user and returns a token for secure access.
- **Request Body**:
  ```json
  {
    "email": "test3@gmail.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  - **Status Code**:
    - `200 OK` if login is successful
    - `401 Unauthorized` if authentication fails
  - **Example Responses**:
    - **Success**:
      ```json
      {
        "message": "Login successfully",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
      ```
    - **Failure**:
      ```json
      {
        "message": "Incorrect account password"
      }
      ```

---

## Project Structure

```plaintext
wallety/
├── controllers/       # Application logic and data handling
├── routes/            # API endpoint definitions
├── lib/               # Utility modules
├── node_modules/      # Project dependencies
├── .env               # Environment variables (not included in the repo)
├── package.json       # Project metadata and scripts
├── app.js             # Main entry point for the application
└── README.md          # Project documentation
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

```

```
