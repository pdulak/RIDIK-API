const express = require('express');
const router = express.Router();

router.post('/endpoint1', (req, res) => {
    const { name, age } = req.body;
    res.json({ message: `Hello, ${name}! You are ${age} years old. PORT is ${process.env.PORT}` });
});

router.post('/endpoint2', (req, res) => {
    const { number } = req.body;
    const square = number ** 2;
    const cube = number ** 3;
    res.json({ square, cube });
});

module.exports = router;