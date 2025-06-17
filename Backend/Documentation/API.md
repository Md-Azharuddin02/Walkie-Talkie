

**API Documentation**
==========================

**User Routes**
---------------

### GET /api/user

* **Description**: Retrieves a list of all users.
* **Authentication**: Requires authentication token in the `Authorization` header.
* **Response**:
	+ **200 OK**: List of users in JSON format.
	+ **401 Unauthorized**: Authentication token is missing or invalid.

### POST /api/user

* **Description**: Creates a new user.
* **Request Body**:
	+ **name**: User's name (string).
	+ **email**: User's email (string).
	+ **password**: User's password (string).
* **Response**:
	+ **201 Created**: New user created successfully.
	+ **400 Bad Request**: Invalid request body.

### POST /api/update-profile

* **Description**: Updates a user's profile information and uploads a profile image.
* **Request Body**:
	+ **name**: User's name (string).
	+ **about**: User's about text (string).
	+ **image**: Profile image file (multipart/form-data).
* **Response**:
	+ **200 OK**: Profile updated successfully.
	+ **400 Bad Request**: Invalid request body.

### POST /api/auth/send-otp

* **Description**: Sends an OTP to the user's email.
* **Request Body**:
	+ **email**: User's email (string).
* **Response**:
	+ **200 OK**: OTP sent successfully.
	+ **400 Bad Request**: Invalid request body.

### POST /api/auth/verify-otp

* **Description**: Verifies the OTP sent to the user's email.
* **Request Body**:
	+ **otp**: OTP code (string).
* **Response**:
	+ **200 OK**: OTP verified successfully.
	+ **400 Bad Request**: Invalid request body.

**Message Routes**
-----------------

### GET /api/messages

* **Description**: Retrieves a list of all messages.
* **Response**:
	+ **200 OK**: List of messages in JSON format.
	+ **401 Unauthorized**: Authentication token is missing or invalid.

### POST /api/messages

* **Description**: Creates a new message.
* **Request Body**:
	+ **text**: Message text (string).
	+ **sender**: Sender's ID (string).
	+ **receiver**: Receiver's ID (string).
* **Response**:
	+ **201 Created**: New message created successfully.
	+ **400 Bad Request**: Invalid request body.

**Models**
----------

### User Model

* **name**: User's name (string).
* **email**: User's email (string).
* **password**: User's password (string).

### Message Model

* **text**: Message text (string).
* **sender**: Sender's ID (string).
* **receiver**: Receiver's ID (string).

**Authentication**
-----------------

* **Token**: Authentication token is required in the `Authorization` header for protected routes.
* **OTP**: OTP code is required for OTP-related routes.

**Error Handling**
-----------------

* **400 Bad Request**: Invalid request body or authentication token.
* **401 Unauthorized**: Authentication token is missing or invalid.
* **500 Internal Server Error**: Server-side error.