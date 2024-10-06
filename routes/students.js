const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Database Connection (Update these with your Azure MySQL details)
const db = mysql.createConnection({
    host: 'abc-university-db-server.database.windows.net',  // Replace with Azure MySQL hostname
    user: 'chalith',                                        // Replace with your MySQL username
    password: 'Azure*100',                                  // Replace with your MySQL password
    database: 'studentappdb',                               // Database name
    port: 1430                                              // Default MySQL port
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL Database!');
});

// CRUD Routes

// GET all students
router.get('/', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) throw err;
        res.render('students', { students: results });
    });
});

// POST to add a new student
router.post('/add', (req, res) => {
    const { student_id, student_name, academic_year, course, module, admission, admission_date } = req.body;
    const query = 'INSERT INTO students (student_id, student_name, academic_year, course, module, admission, admission_date) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [student_id, student_name, academic_year, course, module, admission, admission_date], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// POST to update a student
router.post('/update/:id', (req, res) => {
    const { student_name, academic_year, course, module, admission, admission_date } = req.body;
    const query = 'UPDATE students SET student_name=?, academic_year=?, course=?, module=?, admission=?, admission_date=? WHERE student_id=?';
    db.query(query, [student_name, academic_year, course, module, admission, admission_date, req.params.id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// POST to delete a student
router.post('/delete/:id', (req, res) => {
    const query = 'DELETE FROM students WHERE student_id=?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

module.exports = router;
