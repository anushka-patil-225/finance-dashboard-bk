# Finance Backend API

This project is a backend system for managing financial data with role-based access control. It allows users to securely store, process, and analyze financial records such as income and expenses while restricting access based on user roles (Viewer, Analyst, Admin).

In real-world scenarios, this type of system can power finance dashboards used by businesses, startups, or organizations to track transactions, monitor financial health, and generate insights. For example, admins can manage data and users, analysts can access reports and trends, and viewers can get a high-level summary — ensuring both usability and data security.

## 📋 Overview

This project implements a finance data processing and access control backend that supports user management, financial record operations, and dashboard analytics. It features JWT-based authentication, role-based permissions (Viewer, Analyst, Admin), comprehensive error handling, and interactive API documentation.

## ✨ Features

### Core Functionality
- **User Management**: User registration, login, and role assignment with admin user creation
- **Role-Based Access Control**: Three roles with different permissions
  - **Viewer**: Limited dashboard access
  - **Analyst**: Enhanced analytics and insights
  - **Admin**: Full CRUD operations and user management
- **Financial Records**: Complete CRUD operations for income/expense records with pagination
- **Dashboard Analytics**: Summary statistics, category breakdowns, trends, and filtered data
- **Authentication**: JWT token-based security with bcrypt password hashing

### Technical Features
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Input Validation**: Comprehensive validation for all endpoints
- **Error Handling**: Global error middleware with proper HTTP status codes
- **Pagination**: Paginated record listing for better performance
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **Database**: PostgreSQL with Prisma ORM and migrations

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken), bcrypt
- **Validation**: Manual validation with comprehensive error checking
- **Documentation**: Swagger/OpenAPI (swagger-jsdoc, swagger-ui-express)
- **Development**: tsx, TypeScript compiler

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git** (for cloning the repository)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd finance-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/finance_db
JWT_SECRET=your-super-secret-jwt-key-here
```

**Note**: Replace `username`, `password`, and `finance_db` with your actual PostgreSQL credentials.

### 4. Database Setup
1. Ensure PostgreSQL is running on your system
2. Create a database named `finance_db`
3. Run the database migrations:
```bash
npx prisma migrate dev
```

### 5. Generate Prisma Client
```bash
npx prisma generate
```

## ▶️ Running the Application

### Development Mode
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Production Build (if needed)
```bash
npm run build
npm start
```

## 📚 API Documentation

Once the server is running, access the interactive API documentation at:
```
http://localhost:3000/api-docs
```

The documentation includes:
- All available endpoints with detailed descriptions
- Request/response schemas and examples
- Authentication requirements
- Parameter specifications

## 🔧 API Endpoints Overview

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login

### Records Management (Admin Only)
- `POST /records` - Create a financial record
- `GET /records` - Get all records (with pagination and filters)
- `GET /records/{id}` - Get a specific record
- `PATCH /records/{id}` - Update a record
- `DELETE /records/{id}` - Delete a record

### Dashboard (Role-Based Access)
- `GET /dashboard` - Get full dashboard data
- `GET /dashboard/summary` - Get financial summary
- `GET /dashboard/categories` - Get category totals (Analyst/Admin)
- `GET /dashboard/recent` - Get recent records (role-based limits)
- `GET /dashboard/trends` - Get monthly trends (Analyst/Admin)
- `GET /dashboard/filter` - Get filtered data by type/category

### User Management (Admin Only)
- `POST /users` - Create a new user
- `DELETE /users/{id}` - Deactivate a user


## 📁 Project Structure

```
finance-backend/
├── prisma/
│   ├── schema.prisma          # Database schema with User and Record models
│   └── migrations/            # Database migrations
├── src/
│   ├── app.ts                 # Express app configuration with middleware
│   ├── server.ts              # Server entry point
│   ├── controllers/           # Route handlers with error handling
│   │   ├── auth.controller.ts
│   │   ├── record.controller.ts
│   │   ├── dashboard.controller.ts
│   │   └── user.controller.ts
│   ├── middlewares/           # Custom middlewares
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/                # API routes with Swagger documentation
│   │   ├── auth.routes.ts
│   │   ├── record.routes.ts
│   │   ├── dashboard.routes.ts
│   │   └── user.routes.ts
│   ├── services/              # Business logic with validation
│   │   ├── auth.service.ts
│   │   ├── record.service.ts
│   │   ├── dashboard.service.ts
│   │   └── user.service.ts
│   ├── prisma/
│   │   └── client.ts          # Prisma client instance
│   └── utils/
│       └── swagger.ts         # Swagger configuration
├── .env                       # Environment variables
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication with expiration
- **Password Hashing**: bcrypt for secure password storage
- **Role-Based Access**: Granular permissions for different user types
- **Input Validation**: Comprehensive validation of all inputs
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **Error Handling**: Secure error responses without sensitive information

## 🤔 Assumptions & Design Decisions

### Assumptions Made
1. **Database**: PostgreSQL is the primary database choice
2. **Roles**: Three predefined roles (VIEWER, ANALYST, ADMIN) with specific permissions
3. **Authentication**: JWT tokens expire after 1 hour
4. **User Status**: Users can be ACTIVE or INACTIVE (soft delete approach)
5. **Record Ownership**: Records are associated with users but accessible based on roles
6. **Date Format**: ISO date strings (YYYY-MM-DD) for record dates
7. **Pagination**: Default page size of 10 records with customizable limits

### Design Decisions
1. **Architecture**: Clean Architecture with separation of concerns (routes → controllers → services)
2. **Error Handling**: Global error middleware with consistent error responses
3. **Pagination**: Implemented in record listing for better performance and UX
4. **Validation**: Manual validation with detailed error messages
5. **Dashboard Logic**: Role-based data exposure with different limits
6. **User Management**: Admin can create users directly through API
7. **Soft Delete**: User deactivation instead of hard deletion for audit purposes

## 📈 Future Enhancements

Potential improvements for the project:
- Implement Zod schemas for type-safe validation
- Add unit and integration tests
- Implement rate limiting middleware
- Add audit logging for sensitive operations
- Add email verification for user registration
- Implement soft delete for records
- Add search functionality
- Add data export features
- Implement caching for better performance
- Add API versioning
- Add request logging middleware