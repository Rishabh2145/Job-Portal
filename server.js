require('dotenv').config({ path: './.env' });
const express = require('express');
const connectDB = require('./connection');
const bodyParser = require('body-parser');
const homeRoute = require("./routes/home.routes")
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())

const PORT = process.env.PORT || 8000;
connectDB();

app.use('/', homeRoute);

app.listen(PORT, () => {
    console.log(`App is listening on localhost:${PORT}`);
});