const express = require("express");
const app = express();
const Router = require("./routes/index");
require('dotenv').config();

app.use(express.json());

app.use("/", Router);

const port =  process.env.PORT || 3000

app.listen(port,() =>{
    console.log('Listening to http://localhost:' + port);
})
