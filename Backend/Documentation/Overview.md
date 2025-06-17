

**Backend Documentation**
==========================

**Overview**
------------

The backend of this project is built using Node.js and Express.js. It provides a RESTful API for interacting with the application's data.

**Folder Structure**
-------------------

The backend folder is organized into the following subfolders:

* `Controller`: Contains the controller functions that handle incoming requests and interact with the database.
* `Model`: Contains the database schema definitions for the application's data.
* `Routes`: Contains the route definitions for the API.
* `Service`: Contains utility functions for tasks such as authentication and data processing.
* `Auth`: Contains authentication-related functions and middleware.

**API Endpoints**
-----------------

### User Endpoints

* **GET /user**: Retrieves a list of all users.
* **POST /user**: Creates a new user.
* **GET /user/:id**: Retrieves a user by ID.
* **PUT /user/:id**: Updates a user by ID.
* **DELETE /user/:id**: Deletes a user by ID.

### Message Endpoints

* **GET /message**: Retrieves a list of all messages.
* **POST /message**: Creates a new message.
* **GET /message/:id**: Retrieves a message by ID.
* **PUT /message/:id**: Updates a message by ID.
* **DELETE /message/:id**: Deletes a message by ID.

### Authentication Endpoints

* **POST /auth/login**: Authenticates a user and returns a token.
* **POST /auth/register**: Registers a new user.
* **GET /auth/logout**: Logs out a user.

**Database Schema**
-------------------

The database schema is defined in the `Model` folder. The schema includes the following models:

* **User**: Represents a user in the application.
* **Message**: Represents a message in the application.

**Authentication**
-----------------

Authentication is handled using JSON Web Tokens (JWT). When a user logs in, a token is generated and returned in the response. This token must be included in the `Authorization` header of all subsequent requests.

**Middleware**
-------------

The following middleware functions are used in the application:

* **authenticate**: Verifies the authentication token in the `Authorization` header.
* **authorize**: Verifies that the user has permission to access a particular resource.

**Error Handling**
-----------------

Error handling is implemented using try-catch blocks. If an error occurs, a error response is returned with a 400 or 500 status code, depending on the type of error.

**Dependencies**
----------------

The following dependencies are used in the application:

* **express**: The Express.js framework.
* **mongoose**: The Mongoose ORM for MongoDB.
* **jsonwebtoken**: The JSON Web Token library.
* **bcrypt**: The bcrypt password hashing library.
