# Mini Project Documentation

This mini project showcases basic CRUD functionality using Express.js, EJS, Bootstrap, Method Override, and UUID.

## Installation

To run the project, follow these steps:

1. Clone or fork the repository.
2. Run `npm install` to generate the `node_modules` folder.
3. Install Nodemon globally if you haven't already: `npm install -g nodemon`.
4. Launch the server on localhost:3000 by running `node index.js` or if you installed Nodemon run 'nodemon index.js'.

## Usage

The website allows you to perform CRUD operations on trailers, yards, and drivers. Here are the available routes and HTTP verbs:

- **GET** `/trailers`: Retrieves all trailers.
- **GET** `/trailers/:id`: Retrieves a specific trailer by ID.
- **POST** `/trailers`: Creates a new trailer.
- **PATCH** `/trailers/:id`: Updates a specific trailer by ID.
- **DELETE** `/trailers/:id`: Deletes a specific trailer by ID.

- **GET** `/yards`: Retrieves all yards.
- **GET** `/yards/:id`: Retrieves a specific yard by ID.
- **POST** `/yards`: Creates a new yard.
- **PATCH** `/yards/:id`: Updates a specific yard by ID.
- **DELETE** `/yards/:id`: Deletes a specific yard by ID.

- **GET** `/drivers`: Retrieves all drivers.
- **GET** `/drivers/:id`: Retrieves a specific driver by ID.
- **POST** `/drivers`: Creates a new driver.
- **PATCH** `/drivers/:id`: Updates a specific driver by ID.
- **DELETE** `/drivers/:id`: Deletes a specific driver by ID.

Feel free to explore the project and perform CRUD operations on the different entities.

Please note that this project uses fake data and is intended for demonstration purposes only.

If you have any further questions or need assistance, feel free to ask.