const express = require('express');
const router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

router.get('/', (req,res) => {
    res.json({
        message: '🔐'
    });
});


/* SQL Query */
var sql_query = 'SELECT * FROM users WHERE';
var sql_query2 = 'SELECT email FROM users WHERE email = ';

router.post('/signup', (req, res) => {
    var check_username_query = sql_query +" username = '" + req.body.username + "' OR email = '"+ req.body.email + "'" +';';
    pool.query(check_username_query, (err, data) => {
        if(err){
            res.json({
                message : 'ERROR'
            }); 
        }
        else if(data.rows.length == 0) {
            res.json({
                message : "Username is available."
            });
        }
        else if(data.rows.length > 0) {
            res.json({
                message: 'Username/email exist in database'
            });
        }
    });
});

module.exports = router;