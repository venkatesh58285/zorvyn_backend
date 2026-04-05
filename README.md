# Finance Dashboard Backend – Role-Based Access Control API

## 📌 Overview

This project is a backend system for managing financial records with role-based access control.
It supports secure user management, transaction handling, and dashboard analytics through well-structured APIs.

## 🚀 Features

- JWT-based user authentication with secure password hashing
- Role-based access control (Viewer, Analyst, Admin) with granular permissions
- Complete CRUD operations for financial records (income/expense)
- Advanced filtering by date range, category, and transaction type
- Pagination support for large datasets (page/limit with max 100 records)
- Dashboard analytics with aggregation pipelines (summary, categories, trends)
- Input validation with detailed error messages
- Global error handling with proper HTTP status codes
- Rate limiting to prevent abuse (100 req/15min general, 5 req/15min auth)
- MongoDB integration with Mongoose ODM
- Graceful error handling for database connection issues

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs (Password Hashing)
- express-rate-limit
- dotenv

## 📁 Project Structure

```
src/
 ├── controllers/   → Request handling logic (auth, records, dashboard)
 ├── models/        → Database schemas (User, FinancialRecord)
 ├── routes/        → API routes (auth, records, dashboard)
 ├── middleware/    → Auth & role checks (verifyToken, authorize, validation)
 ├── config/        → DB and environment setup
 └── app.js         → Express app configuration
```

## 🔐 Roles & Permissions

- **Viewer** → Can only view dashboard data (summary, categories, trends)
- **Analyst** → Can view records and analytics (read-only access to records + dashboard)
- **Admin** → Full access (manage users & records - create, read, update, delete)

## 📡 API Endpoints

**Auth:**

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token

**Records:**

- `GET /records` - Get records with pagination/filtering (Analyst, Admin)
- `POST /records` - Create new record (Admin only)
- `PUT /records/:id` - Update record (Admin only)
- `DELETE /records/:id` - Delete record (Admin only)

**Dashboard:**

- `GET /dashboard/summary` - Total income, expense, balance
- `GET /dashboard/categories` - Category-wise breakdown
- `GET /dashboard/trends` - Monthly trends

## 📊 Dashboard Logic

Dashboard APIs use MongoDB aggregation pipelines to calculate:

- **Summary**: Total income, expenses, and net balance using `$group` and `$cond`
- **Categories**: Category-wise distribution with income/expense totals and record counts
- **Trends**: Monthly income/expense trends grouped by year and month

All aggregations handle conditional logic for income vs expense calculations and provide real-time analytics.

## ⚙️ Setup Instructions

1. Clone the repository
2. Install dependencies → `npm install`
3. Create `.env` file with required variables
4. Start server → `npm start`

## 🧪 Sample Environment Variables

```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/zorvyn_db
JWT_SECRET=your_super_secret_key_change_in_production
```

## ⚠️ Assumptions

- Roles are predefined (viewer/analyst/admin) and assigned during user registration
- Authentication is handled using JWT tokens with 7-day expiration
- No frontend is included (API-only backend system)
- MongoDB Atlas is used for database (with graceful error handling for connection issues)
- All financial amounts are positive numbers (income/expense distinction via type field)
- Date filtering uses YYYY-MM-DD format
- Pagination defaults to 10 records per page with maximum 100

## 🛡️ Validation & Error Handling

The application validates all input data including:

- Email format validation with regex
- Password minimum length (6 characters)
- Amount positivity checks
- Enum validation for transaction types and user roles
- Required field validation

Returns meaningful error messages with proper HTTP status codes:

- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid/missing token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found (resource doesn't exist)
- 429: Too Many Requests (rate limited)
- 500: Server Error (database/internal errors)

## 📌 Key Highlights 

- Clean separation of concerns (MVC structure)
- Scalable role-based access control
- Efficient aggregation for analytics
- Focus on maintainability and readability
