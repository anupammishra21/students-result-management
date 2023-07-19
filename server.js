const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true
})); //body read

const crudRouter = require('./routes/crud.routes');

app.use(crudRouter);


require(path.join(__dirname, '/config/database'))();

app.listen(process.env.PORT, () => {
    console.log(`Server is running @ http://127.0.0.1:${process.env.PORT}`);
})