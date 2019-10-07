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
var sql_query = 'SELECT username FROM users WHERE username = ';

router.post('/signup', (req, res) => {
    var check_username_query = sql_query +"'" + req.body.username + "'" +';';
    pool.query(check_username_query, (err, data) => {
        if(err){
            res.json({
                message : "Error!"
            }); 
        }
        else if(data.rows.length == 0) {
            res.json({
                message : "Username is available."
            });
        }
        else if(data.rows.length > 0) {
            res.json({
                message: 'User exist in database'
            });
        }
	});
});

module.exports = router;