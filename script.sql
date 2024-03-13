-- PARA OS QUE USAM WORKBENCH:
-- CREATE SCHEMA OnlineStore;


-- Criar o banco de dados:
CREATE DATABASE OnlineStore;


-- Usar o banco:
USE OnlineStore;


-- Criar tabelas
CREATE TABLE Product(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    description VARCHAR(256),
    instock_quantity INT,
    price DECIMAL(8, 2)
);

CREATE TABLE Customer(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    password VARCHAR(256),
    email VARCHAR(256) UNIQUE
);

CREATE TABLE ProductOrder(
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    customer_id INT,
    product_quantity INT,
    CONSTRAINT FK_Product_Order
    FOREIGN KEY (product_id) REFERENCES Product(id),
    CONSTRAINT FK_Customer_Order
    FOREIGN KEY (customer_id) REFERENCES Customer(id)
);

-- Exemplos de Insert
INSERT INTO Product (name, description, instock_quantity, price)
VALUES("Apple Macbook Pro", "15 inch, i7, 16GB RAM", 5, 667.00);

INSERT INTO Customer (name, password, email)
VALUES("Pedro", "jujutsukaisen", "pedrinhootaku@gmail.com");

INSERT INTO ProductOrder (product_id, customer_id, product_quantity)
VALUES(1, 1, 1);