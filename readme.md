# Blogging API Backend

A robust and scalable backend API designed to power a blogging platform. This application supports user authentication, role-based access control, and CRUD operations on blog posts. Admins and users can interact with the platform under clearly defined permissions, while the public API allows content discovery with advanced search, sort, and filter capabilities.

## Key Features

- **User Authentication:** Secure user login and registration with hashed passwords.
- **Role-Based Access Control:**
  - Users can create, update, and delete their own blogs.
  - Admins can manage users and moderate blog content.
- **Blog Management:** Dynamic endpoints to manage blogs, ensuring data integrity.
- **Public API:** Allows viewing blogs with powerful search and filter options.
- **Error Handling:** Comprehensive error management for a smooth user experience.

## Technologies Used

- **TypeScript** for type-safe and maintainable code.
- **Node.js** with **Express.js** for server-side development.
- **MongoDB** with **Mongoose** for database interactions.
- **JWT** for secure user authentication.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/umayeremon/blog-project-b4a3.git
   cd blog-project-b4a3
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following variables:

   ```env
   NODE_ENV=dev
   PORT=5001
   DB_URL="create your own database"
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_TOKEN="create your own access token"
   JWT_ACCESS_EXPIRES_IN=1d
   ```

4. Run the application:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- **Register User:** `POST /api/auth/register`
- **Login User:** `POST /api/auth/login`

### Blog Operations

- **Create Blog:** `POST /api/blogs`
- **Update Blog:** `PATCH /api/blogs/:id`
- **Delete Blog:** `DELETE /api/blogs/:id`
- **Get All Blogs:** `GET /api/blogs`

### Admin Actions

- **Block User:** `PATCH /api/admin/users/:id/block`
- **Delete Any Blog:** `DELETE /api/admin/blogs/:id`

## Project Structure

- **src/models:** Mongoose schemas for data models.
- **src/controllers:** Functions to handle business logic.
- **src/routes:** API endpoint definitions.
- **src/middleware:** Authentication and role validation logic.
- **src/utils:** Helper functions for error handling and other utilities.

## Usage

Access the API using tools like Postman or integrate it with a frontend client. Test with valid tokens for secured routes.

## Contributing

Contributions are welcome! Submit a pull request or open an issue for feedback.
