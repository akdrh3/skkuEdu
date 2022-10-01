const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dbconfig = require('./database.js');
const db = mysql.createConnection(dbconfig);

const app = express();
app.use(bodyParser.json());
app.listen(3001);
let cors = require("cors");
app.use(cors());

//database connection error throwing
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
        console.log('journal : ' + data);
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
        //console.log('book : ' + JSON.stringify(data));
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
        console.log('journal_with_pagenum : ' + data);
        res.send(
            data
        );
        return;

    });
});


app.get('/book_with_pagenum',(req, res) => {
    
    let pageNum = [req.query.pageNum*10,req.query.pageNum*10+10];
    console.log(req.query);
    db.query('SELECT * FROM book WHERE id BETWEEN ? AND ?', pageNum, (err, data, field) => {
        if (err) {
            res.send(err);
            return;
        }
        console.log("book_with_pagenum : "+data);
        res.send(
            data
        );
        return;

    });
});

app.get('/journal_id',(req, res) => {
    console.log(req.query);
    db.query('SELECT file FROM journal WHERE id = ?', req.query.id, (err, data, field) => {
        if (err) {
            res.send(err);
            return;
        }
        console.log(data[0].file);
        res.download(
            data[0].file
        );
        return;

    });
});

app.get('/book_id',(req, res) => {
    console.log(req.query);
    db.query('SELECT file FROM book WHERE id = ?', req.query.id, (err, data, field) => {
        if (err) {
            res.send(err);
            return;
        }
        console.log(data[0].file);
        res.download(
            data[0].file
        );
        return;

    });
});