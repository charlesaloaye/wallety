# Wallety

Wallety is an Express.js-based financial management application. 
It provides a robust backend for handling wallets, users, and transactions efficiently.

## Features

- Manage wallets and perform transactions
- User registration and authentication
- Well-structured routing and controllers for scalability

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
            "name": "Dollar",
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
    "senderWalletId": "1",
    "receiverWalletId": "2",
    "amount": 100.0,
    "currency": "USD"
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
        "message": "Transaction successful",
        "transactionId": "txn123",
        "senderWalletId": "1",
        "receiverWalletId": "2",
        "amount": 100.0,
        "currency": "USD"
      }
      ```
    - **Failure**:
      ```json
     {
    "message": "Insufficient funds"
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
        "id": "1",
        "userId": "123",
        "balance": 500.0,
        "currency": "USD",
        "createdAt": "2025-01-15T10:00:00Z",
        "updatedAt": "2025-01-20T15:30:00Z"
      }
      ```
    - **Failure**:
      ```json
      {
        "error": "Wallet not found"
      }
      ```

---

### User Endpoints

#### **`GET /users`**
- **Description**: Retrieves a list of all registered users.
- **Response**:
  - **Status Code**: `200 OK`
  - **Example Response**:
    ```json
    [
      {
        "id": "123",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "createdAt": "2025-01-10T09:00:00Z"
      },
      {
        "id": "456",
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "createdAt": "2025-01-12T12:30:00Z"
      }
    ]
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
        "id": "123",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "createdAt": "2025-01-10T09:00:00Z"
      }
      ```
    - **Failure**:
      ```json
      {
        "error": "User not found"
      }
      ```

#### **`POST /users/register`**
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  - **Status Code**:
    - `201 Created` if registration is successful
    - `400 Bad Request` if validation fails (e.g., email already exists)
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
        "error": "Email already exists"
      }
      ```

#### **`POST /users/login`**
- **Description**: Authenticates a user and returns a token for secure access.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
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
        "message": "Login successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
      ```
    - **Failure**:
      ```json
      {
        "error": "Invalid email or password"
      }
      ```

---

## Project Structure

```plaintext
wallety/
├── controllers/       # Application logic and data handling
├── routes/            # API endpoint definitions
├── library/           # Utility modules
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

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
