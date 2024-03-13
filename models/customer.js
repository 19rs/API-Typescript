"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../dist/db");
const create = (customer, callback) => {
    const queryString = "INSERT INTO Customer (name, email, password) VALUES (?, ?, ?)";
    db_1.db.query(queryString, [customer.name, customer.email, customer.password], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (customerId, callback) => {
    const queryString = `SELECT * FROM Customer WHERE id=?`;
    db_1.db.query(queryString, customerId, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const customer = {
            id: row.id,
            name: row.name,
            email: row.email,
            password: row.password
        };
        callback(null, customer);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = "SELECT * FROM Customer";
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const customers = [];
        rows.forEach(row => {
            const customer = {
                id: row.id,
                name: row.name,
                email: row.email,
                password: row.password,
            };
            customers.push(customer);
        });
        callback(null, customers);
    });
};
exports.findAll = findAll;
const update = (customer, callback) => {
    const queryString = `UPDATE Customer SET name=?, password=?, email=? WHERE id=?`;
    db_1.db.query(queryString, [customer.name, customer.password, customer.email, customer.id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
const deleteCustomer = (customerId, callback) => {
    const queryString = `DELETE FROM Customer WHERE id=?`;
    db_1.db.query(queryString, [customerId], (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null);
        }
    });
};
exports.deleteCustomer = deleteCustomer;
