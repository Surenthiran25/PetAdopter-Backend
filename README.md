# Pet Adoption Platform API

This is a RESTful API for a pet adoption platform built with Node.js, Express.js, and MongoDB.

## Features

- User authentication (signup, login, JWT-based auth)
- Complete pet management (CRUD operations)
- Adoption request processing and status tracking
- Search and filtering functionality for pets by various criteria
- User profile management and adoption history
- Admin dashboard capabilities
- Image upload support for pet profiles

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File uploads

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account or local MongoDB installation

### Installation

1. Clone the repository
2. Create a `.env` file based on `.env.example`
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - Logout user

### Users

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)
- `PUT /api/users/:id/password` - Change password

### Pets

- `GET /api/pets` - Get all pets (with filtering options)
- `GET /api/pets/:id` - Get specific pet
- `POST /api/pets` - Create new pet (Admin only)
- `PUT /api/pets/:id` - Update pet (Admin only)
- `DELETE /api/pets/:id` - Delete pet (Admin only)
- `PUT /api/pets/:id/status` - Update pet adoption status (Admin only)

### Adoptions

- `GET /api/adoptions` - Get all adoptions (Admin can see all, users see only their own)
- `GET /api/adoptions/:id` - Get specific adoption
- `POST /api/adoptions` - Create adoption request
- `PUT /api/adoptions/:id/status` - Update adoption status
- `DELETE /api/adoptions/:id` - Delete adoption (Admin only)
- `GET /api/adoptions/history` - Get user adoption history
- `GET /api/adoptions/pet/:petId` - Get all adoption requests for a pet (Admin only)

## Deployment

This API is designed to be deployed on Render. Simply connect your GitHub repository to Render and set the environment variables as specified in the `.env.example` file.

## License

This project is licensed under the MIT License.