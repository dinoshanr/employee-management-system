const express = require('express');
const app = express();
const mySql = require('mysql');
const cors = require('cors');

//fixes cors error
app.use(cors());
//express will use json 
app.use(express.json());

//calling the database
const db = mySql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employeeSystem'
})

//creating a post req to insert stuff into our database
app.post('/create', (req, res) => {
    console.log(req.body)
    //defining info from the front end to database
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query('INSERT INTO employees(name, age, country, position, wage) VALUES (?,?,?,?,?)',
        [name, age, country, position, wage],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                // send a message that values has been inserted
                res.send("values inserted")
            }
        }
    );
});

app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
}) 

app.listen(3001, () => {
    console.log('your server is running on 3001')
})

