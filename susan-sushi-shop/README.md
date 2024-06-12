# Susan's Sushi Shop 🍣

This is a full-stack web application for Susan's Sushi Shop.

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`
3. Create a `.env` file and set up your database credentials (`PORT` and `MONGODB_URI`).
4. Run the server: `node src/app.js`

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`
3. Run the frontend: `npm start`

## Database

1. MongoDB is used as the database.
2. Install MongoDB following the instructions for your operating system from the [official MongoDB website](https://docs.mongodb.com/manual/installation/).
3. Start the MongoDB server. You can find instructions in the MongoDB documentation for your operating system.
4. Set up your MongoDB database credentials in the `.env` file (`MONGODB_URI`). Ensure that the URI includes the necessary authentication details and database name.
5. After completing the setup, run the backend server to establish a connection with the MongoDB database.

<!-- Run the SQL scripts in `backend/sql/create_tables.sql` to set up the necessary tables. -->

Note: The `.env` file is included in the repository for ease of setup. Remember to update it with your actual database credentials.