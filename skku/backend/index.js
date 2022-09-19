const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dbconfig = require('./database.js');
const db = mysql.createConnection(dbconfig);

const app = express();
app.use(bodyParser.json());
app.listen(3001);

//database connection error
db.connect((err) => {
    if(!err) {
        console.log('DB Connected.');
    } else {
        console.log('DB Connected failed. : Error ' + JSON.stringify(err));
    }
});


app.get('/journal',(req, res) => {
    db.query('SELECT * FROM journal ORDER BY upload_date DESC LIMIT 10',(err, data, field) => {
        if(err) {
            console.log('ERROR : '+ JSON.stringify(err));
            return;
        } 

        console.log('DATA : ' + data);
        res.send(
            data
        );
        return;
    });
});

app.get('/book',(req, res) => {
    db.query('SELECT * FROM book ORDER BY upload_date DESC LIMIT 10',(err, data, field) => {
        if(err) {
            console.log('ERROR : '+ JSON.stringify(err));
            return;
        }

        console.log('DATA : ' + data);
        res.send(
            data
        );
        return;
    });
});





app.get('/journal_with_pagenum',(req, res) => {
    
    let pageNum = [req.query.pageNum*10,req.query.pageNum*10+10];
    console.log(req.query);
    db.query('SELECT * FROM journal WHERE id BETWEEN ? AND ?', pageNum, (err, data, field) => {
        if (err) {
            res.send(err);
            return;
        }

        if (data && data.length === 0) {
            res.send({
                success: false,
                msg: 'Employee not found.'
            });
            return;
        }

        res.send({
            success: true,
            data: data
        });
        return;

    });
});

//book 받아오기
app.get('/journal_with_pagenum',(req, res) => {
    
    let pageNum = [req.query.pageNum*10,req.query.pageNum*10+10];
    console.log(req.query);
    db.query('SELECT * FROM journal WHERE id BETWEEN ? AND ?', pageNum, (err, data, field) => {
        if (err) {
            res.send(err);
            return;
        }

        if (data && data.length === 0) {
            res.send({
                success: false,
                msg: 'Employee not found.'
            });
            return;
        }

        res.send({
            success: true,
            data: data
        });
        return;

    });
});



app.post('/employee',(req, res) => {
    let request = req.body;
    let cols = [request.empCode, request.name, request.salary];
    db.query('INSERT INTO employees (empCode, name, salary, created_at) VALUES (?, ?, ?, now())', cols, (err, data, field) => {
        if(err) {
            console.log('ERROR : '+ JSON.stringify(err));
            return;
        }

        if(data && data.length === 0) {
            res.send({
                success: false,
                msg: 'Employee Created Unsuccessfully.'
            });
            return;
        }
        // console.log('DATA : ' + JSON.stringify(data));
        res.send({
            success: true,
            data: data.insertId,
            msg: 'Employee Created Successfully.'
        });
        return;
    });
});

app.put('/employee/:id',(req, res) => {
    let request = req.body;
    let cols = [req.params.id];
    
    db.query('SELECT * FROM employees WHERE id = ? LIMIT 1', cols, (err, data, field) => {
        if (err) {
            res.send(err);
            return;
        }

        if (data && data.length === 0) {
            res.send({
                success: false,
                msg: 'Employee not found.'
            });
            return;
        } else {
            cols = [request.empCode,request.name,request.salary,req.params.id];
            db.query('UPDATE employees SET empCode = ?, name = ?, salary = ?, updated_at = now() WHERE id = ?', cols, (err, data) => {
                if (err) {
                    res.send(err);
                    return;
                }

                res.send({
                    success: true,
                    data: data,
                    msg: 'Employee Updated Success'
                });
                return;

            });
        }

    });
});

app.delete('/employee/:id', (req, res) => {
    let cols = [req.params.id];
    db.query('SELECT * FROM employees WHERE id = ? LIMIT 1', cols, (err, data, field) => {
        if (err) {
            res.send(err);
            return;
        }
        if (data && data.length === 1) {
            db.query('DELETE FROM employees WHERE id = ?', cols, (err, data, field) => {
                if(err) {
                    res.send(err);
                    return;
                }
                res.send({
                    success: true,
                    msg: 'Deleted Successfully.'
                });
                return;
            });
        } else {
            res.send({
                success: false,
                msg: 'Employee not found.'
            });
            return;
        }        
    });

});