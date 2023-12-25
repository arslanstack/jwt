# JWT Authentication Boilerplate in React JS and Laravel Framework

This codebase serves as a foundational user authentication boilerplate/scaffolding for projects built with the Laravel and React JS frameworks. It incorporates essential features for user authentication and can be easily integrated into new Laravel + React JS projects.

## Technologies Used

### Laravel Backend
- Laravel Framework
- Tymon JWT Package: Used for JWT-based API authentication in Laravel.
- MySQL Database: The database file is provided to set up the required tables.

### React JS Frontend
- React JS: JavaScript library for building user interfaces.
- React Router: Used for navigation and routing in the React application.
- Bootstrap: Frontend framework for styling and layout.
- Axios: A promise-based HTTP client for making requests to the Laravel backend.

## Getting Started

Follow these steps to get started with the boilerplate:

### Laravel Backend

1. Set up your Laravel environment and database configuration.
2. Run `composer install` to install the required dependencies.
3. Set up your `.env` file with the necessary configurations, including your database connection and JWT secret.
4. Run database migrations with `php artisan migrate` to create the required tables.
5. Seed the database with sample data (optional) using `php artisan db:seed`.
6. Start the Laravel development server: `php artisan serve`.

### React JS Frontend

1. Navigate to the `react-frontend` directory.
2. Run `npm install` to install the required Node.js modules.
3. Update the API URL in the React application to point to your Laravel backend.
4. Start the React development server: `npm start`.

## Postman API Collection

Explore the provided Postman API Collection for testing API endpoints and requests.

Feel free to integrate and customize these functionalities to meet the requirements of your projects. If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

Happy coding!
