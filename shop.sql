-- Coffees Table
CREATE TABLE Coffees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    size VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Customers Table
CREATE TABLE Customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Orders Table
CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES Customers(id),
    coffee_id INTEGER REFERENCES Coffees(id),
    quantity INTEGER NOT NULL,
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
