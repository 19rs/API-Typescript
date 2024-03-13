"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../dist/db");
const create = (product, callback) => {
    const queryString = "INSERT INTO Product (name, description, instock_quantity, price) VALUES (?, ?, ?, ?)";
    const quantidade = (product.instock_quantity).toFixed(2);
    db_1.db.query(queryString, [product.name, product.description, quantidade, product.price], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (productId, callback) => {
    const queryString = "SELECT * FROM Product WHERE id=?";
    db_1.db.query(queryString, productId, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const product = {
            id: row.id,
            name: row.name,
            description: row.description,
            instock_quantity: row.instock_quantity,
            price: row.price
        };
        callback(null, product);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = "SELECT * FROM Product";
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const products = [];
        rows.forEach(row => {
            const product = {
                id: row.id,
                name: row.name,
                description: row.description,
                instock_quantity: row.instock_quantity,
                price: row.price
            };
            products.push(product);
        });
        callback(null, products);
    });
};
exports.findAll = findAll;
const update = (product, callback) => {
    const queryString = `UPDATE Product SET name=?, description=?, instock_quantity=?, price=? WHERE id=?`;
    console.log(product);
    db_1.db.query(queryString, [product.name, product.description, product.instock_quantity, product.price, product.id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
const deleteProduct = (productId, callback) => {
    const queryString = `DELETE FROM Product WHERE id=?`;
    let product_id = Number(productId);
    db_1.db.query(queryString, [product_id], (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null);
        }
    });
};
exports.deleteProduct = deleteProduct;
