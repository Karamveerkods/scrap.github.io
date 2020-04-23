const mongoose = require('./models/init/mongoose');
const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const PORT=3001;
var cors = require('cors')
app.use(cors())	
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '../assets/downloads')));
app.get("/", (request, response) => {
	response.redirect("/feeds")
})

require(__dirname + '/controllers/index')(app);

app.listen(PORT, () => {
    console.log(`server getting started on port number ${PORT}`);
});