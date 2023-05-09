const testModule = require('./modules/testModule');
const slackBot = require('./modules/slackBot');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());

// Load environment variables from .env file
dotenv.config();
app.use(morgan('dev'));
app.use('/test', testModule);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
