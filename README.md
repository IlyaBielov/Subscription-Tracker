# Subscription Tracker

Subscription Tracker is a subscription management application that allows users to manage their subscriptions, receive renewal reminders, and handle authentication securely. The project is built using Node.js, Express, and MongoDB, with additional integrations for email notifications and workflow automation.

## Features

- **User Authentication**: Sign up, sign in, and secure access to resources using JWT.
- **Subscription Management**: Create, view, and manage subscriptions with automatic renewal date calculations.
- **Email Notifications**: Send subscription renewal reminders using Nodemailer.
- **Workflow Automation**: Automate subscription-related workflows using Upstash Workflow.
- **Rate Limiting & Bot Detection**: Protect endpoints using Arcjet for rate limiting and bot detection.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Email**: Nodemailer
- **Workflow Automation**: Upstash Workflow
- **Rate Limiting & Bot Detection**: Arcjet
- **Environment Management**: dotenv

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/IlyaBielov/subdub.git
   cd subdub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
    - Create `.env.development.local` and `.env.production.local` files.
    - Add the following variables:
      ```env
      PORT=3000
      NODE_ENV=development
      DB_URL=<your_mongodb_connection_string>
      JWT_SECRET=<your_jwt_secret>
      JWT_EXPIRES_IN=1d
      ARCJET_KEY=<your_arcjet_key>
      QSTASH_URL=<your_qstash_url>
      QSTASH_TOKEN=<your_qstash_token>
      SERVER_URL=<your_server_url>
      EMAIL_PASSWORD=<your_email_password>
      ```

4. Start the application:
    - Development mode:
      ```bash
      npm run dev
      ```
    - Production mode:
      ```bash
      npm start
      ```

Here is an updated version of the API documentation with more details about request parameters, responses, and error codes:


## API Endpoints

### Authentication

#### **POST** `/api/v1/auth/sign-up`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "string (required)",
    "email": "string (required, valid email)",
    "password": "string (required, min 6 characters)"
  }
  ```
- **Response**:
    - **201 Created**:
      ```json
      {
        "success": true,
        "message": "User created successfully",
        "data": {
          "token": "string",
          "user": {
            "_id": "string",
            "name": "string",
            "email": "string"
          }
        }
      }
      ```
    - **409 Conflict**: User already exists.
    - **400 Bad Request**: Validation errors.

#### **POST** `/api/v1/auth/sign-in`
- **Description**: Log in an existing user.
- **Request Body**:
  ```json
  {
    "email": "string (required, valid email)",
    "password": "string (required)"
  }
  ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "success": true,
        "message": "User signed in successfully",
        "data": {
          "token": "string",
          "user": {
            "_id": "string",
            "name": "string",
            "email": "string"
          }
        }
      }
      ```
    - **404 Not Found**: User not found.
    - **401 Unauthorized**: Invalid password.

#### **POST** `/api/v1/auth/sign-out`
- **Description**: Log out the user.
- **Response**:
    - **200 OK**: Successfully logged out.

---

### Users

#### **GET** `/api/v1/users`
- **Description**: Get all users.
- **Response**:
    - **200 OK**:
      ```json
      {
        "success": true,
        "data": [
          {
            "_id": "string",
            "name": "string",
            "email": "string"
          }
        ]
      }
      ```

#### **GET** `/api/v1/users/:id`
- **Description**: Get a specific user (requires authorization).
- **Response**:
    - **200 OK**:
      ```json
      {
        "success": true,
        "data": {
          "_id": "string",
          "name": "string",
          "email": "string"
        }
      }
      ```
    - **404 Not Found**: User not found.
    - **401 Unauthorized**: Invalid or missing token.

---

### Subscriptions

#### **GET** `/api/v1/subscriptions`
- **Description**: Get all subscriptions.
- **Response**:
    - **200 OK**:
      ```json
      {
        "success": true,
        "data": [
          {
            "_id": "string",
            "name": "string",
            "price": "number",
            "currency": "string",
            "frequency": "string",
            "category": "string",
            "status": "string",
            "startDate": "date",
            "renewalDate": "date",
            "user": "string"
          }
        ]
      }
      ```

#### **GET** `/api/v1/subscriptions/:id`
- **Description**: Get a specific subscription.
- **Response**:
    - **200 OK**:
      ```json
      {
        "success": true,
        "data": {
          "_id": "string",
          "name": "string",
          "price": "number",
          "currency": "string",
          "frequency": "string",
          "category": "string",
          "status": "string",
          "startDate": "date",
          "renewalDate": "date",
          "user": "string"
        }
      }
      ```
    - **404 Not Found**: Subscription not found.

#### **POST** `/api/v1/subscriptions`
- **Description**: Create a new subscription (requires authorization).
- **Request Body**:
  ```json
  {
    "name": "string (required)",
    "price": "number (required)",
    "currency": "string (optional, default: USD)",
    "frequency": "string (required, one of: daily, weekly, monthly, yearly)",
    "category": "string (required)",
    "paymentMethod": "string (required)",
    "startDate": "date (required)"
  }
  ```
- **Response**:
    - **201 Created**:
      ```json
      {
        "success": true,
        "data": {
          "subscription": {
            "_id": "string",
            "name": "string",
            "price": "number",
            "currency": "string",
            "frequency": "string",
            "category": "string",
            "status": "string",
            "startDate": "date",
            "renewalDate": "date",
            "user": "string"
          },
          "workflowRunId": "string"
        }
      }
      ```
    - **400 Bad Request**: Validation errors.
    - **401 Unauthorized**: Invalid or missing token.

#### **GET** `/api/v1/subscriptions/user/:id`
- **Description**: Get subscriptions for a specific user (requires authorization).
- **Response**:
    - **200 OK**:
      ```json
      {
        "success": true,
        "data": [
          {
            "_id": "string",
            "name": "string",
            "price": "number",
            "currency": "string",
            "frequency": "string",
            "category": "string",
            "status": "string",
            "startDate": "date",
            "renewalDate": "date",
            "user": "string"
          }
        ]
      }
      ```
    - **401 Unauthorized**: Invalid or missing token.

---

### Workflows

#### **POST** `/api/v1/workflows/subscription/reminder`
- **Description**: Trigger subscription renewal reminders.
- **Request Body**:
  ```json
  {
    "subscriptionId": "string (required)"
  }
  ```
- **Response**:
    - **200 OK**: Workflow triggered successfully.
    - **404 Not Found**: Subscription not found.
    - **400 Bad Request**: Missing or invalid parameters.

## Middleware

- **Authentication Middleware**: Validates JWT tokens and authorizes users.
- **Error Middleware**: Handles errors and provides meaningful responses.
- **Arcjet Middleware**: Protects endpoints with rate limiting and bot detection.

## Models

- **User**: Stores user information (name, email, password).
- **Subscription**: Stores subscription details (name, price, frequency, renewal date, etc.).

## Utilities

- **Email Templates**: Predefined templates for subscription renewal reminders.
- **Send Email**: Utility to send emails using Nodemailer.

## License

This project is licensed under the MIT License.

This `README.md` provides an overview of the project, its features, setup instructions, and API documentation. Adjust the content as needed for your specific use case.