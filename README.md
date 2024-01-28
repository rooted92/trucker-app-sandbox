# Mini Project Documentation

This Luna Link (formerly Fleet Finder - [frontend code](https://github.com/rooted92/frontendFF), [backend code](https://github.com/rooted92/backendFF)) mini project showcases basic CRUD functionality using Express.js, MongoDB, Mongoose, EJS, Bootstrap, and Method Override.

## Installation

To run the project, follow these steps:

1. **Clone the Repository**:
   Clone or fork this repository to your local machine.

2. **Install Dependencies**:
   Run `npm install` to install required node modules.

3. **Database Setup**:
   Ensure MongoDB is installed and running on your machine.

4. **Seed the Database** (Optional):
   Run `node seeds.js` or `nodemon seeds.js` to seed the database with initial data.

5. **Start the Server**:
   Launch the server on localhost:3000 using `nodemon index.js` or `node index.js`.

## Usage

The website allows you to perform CRUD operations on trailers, yards, and drivers. Here are the available routes and HTTP verbs:

### Trailers
- **GET** `/trailers`: Retrieves all trailers.
- **GET** `/trailers/:id`: Retrieves a specific trailer by ID.
- **POST** `/trailers`: Creates a new trailer.
- **PATCH** `/trailers/:id`: Updates a specific trailer by ID.
- **DELETE** `/trailers/:id`: Deletes a specific trailer by ID.

### Yards
- **GET** `/yards`: Retrieves all yards.
- **GET** `/yards/:id`: Retrieves a specific yard by ID.
- **POST** `/yards`: Creates a new yard.
- **PATCH** `/yards/:id`: Updates a specific yard by ID.
- **DELETE** `/yards/:id`: Deletes a specific yard by ID.

### Drivers
- **GET** `/drivers`: Retrieves all drivers.
- **GET** `/drivers/:id`: Retrieves a specific driver by ID.
- **POST** `/drivers`: Creates a new driver.
- **PATCH** `/drivers/:id`: Updates a specific driver by ID.
- **DELETE** `/drivers/:id`: Deletes a specific driver by ID.

Feel free to explore the project and perform CRUD operations on the different entities.

## Notes
- This project uses MongoDB for data storage, configured to run on a local instance.
- Data persistence is limited to the local MongoDB instance. It will remain stored as long as the local database is running and not manually cleared.
- The data is intended for demonstration purposes. Each local setup will have its own separate dataset.

If you have any further questions or need assistance, feel free to ask.