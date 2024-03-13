import { BasicCustomer, Customer } from "../types/customer";
import { db } from "../dist/db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (customer: Customer, callback: Function) => {
  const queryString = "INSERT INTO Customer (name, email, password) VALUES (?, ?, ?)";

  db.query(
    queryString,
    [customer.name, customer.email, customer.password],
    (err, result) => {
      if (err) { callback(err) };

      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};


export const findOne = (customerId: number, callback: Function) => {
  const queryString = `SELECT * FROM Customer WHERE id=?`;

  db.query(queryString, customerId, (err, result) => {
    if (err) { callback(err) }

        const row = (<RowDataPacket>result)[0];
        const customer: Customer = {
            id: row.id,
            name: row.name,
            email: row.email,
            password: row.password
        }
        callback(null, customer)
    })
}


export const findAll = (callback: Function) => {
    const queryString = "SELECT * FROM Customer"

    db.query(queryString, (err, result) => {
        if(err) { callback(err) }

        const rows = <RowDataPacket[]>result
        const customers: Customer[] = []

        rows.forEach(row => {
            const customer: Customer = {
                id: row.id,
                name: row.name,
                email: row.email,
                password: row.password,
            }
            customers.push(customer);
        })
        callback(null, customers)
    })
}

export const update = (customer: Customer, callback: Function) => {
    const queryString = `UPDATE Customer SET name=?, password=?, email=? WHERE id=?`;
    
    db.query(
      queryString,
      [customer.name, customer.password, customer.email, customer.id],
      (err, result) => {
        if (err) { callback(err) }
        callback(null);
      }
    )
  }


export const deleteCustomer = (customerId: number, callback: Function) => {
    const queryString = `DELETE FROM Customer WHERE id=?`
    
    db.query(queryString, [customerId], (err, result) => {
        if(err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}
    
