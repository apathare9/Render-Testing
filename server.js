const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
// const ejsLint = require('ejs-lint');

const run = require('./server/database/connection');
const client = require('./server/database/connection');
const { default: mongoose } = require('mongoose');

const app = express();


dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080


const uri = "mongodb+srv://ajinkyapathare123:ajinkya123@cluster0.7vxhrqt.mongodb.net/users?retryWrites=true&w=majority";

//log requests
app.use(morgan('tiny'));

//mongodb connection
mongoose.connect(uri);


//parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}))

// set view engine
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
});