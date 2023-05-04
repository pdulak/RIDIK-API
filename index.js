const testModule = require('./modules/testModule');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');const app = express();
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

app.use('/test', testModule);

app.post('/upload', (req, res) => {
    const fileUrl = req.body.fileUrl;

    // Do something with the fileUrl here...

    res.json({ success: true });
});

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
