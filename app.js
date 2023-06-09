const express = require('express');
const cors = require('cors')

const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

const db =  mysql.createConnection({
    user: process.env.MYSQLDB_USER,
    host: process.env.MYSQLDB_HOST,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    port: process.env.MYSQLDB_PORT,
})




app.get('/ticket', (req, res) => {
    db.query("SELECT * FROM ticket", (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.listen('3001', () => {
    console.log('Server is running on port 3001');
})

app.post('/create', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const call_number = req.body.call_number
    const website = req.body.website
    const status = req.body.status

    db.query("INSERT INTO ticket (title, description, call_number, website, status) VALUES(?,?,?,?,?)", [title, description, call_number, website, status],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Values inserted");
        }
    })  
})

app.put('/update', (req,res)  => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const call_number = req.body.call_number;
    const website = req.body.website;
    const status = req.body.status;
    
    db.query("UPDATE ticket SET title = ?, description = ?, call_number = ?, website = ?, status = ? WHERE id = ?", [title, description, call_number, website, status, id], (err, result)=> {
        if(err) {
            console.log(err, 'back')
        }else{
            res.send(result)
        }
    })
})



