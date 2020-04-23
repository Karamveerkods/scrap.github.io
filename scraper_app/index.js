const mongoose = require('./models/init/mongoose');
const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const PORT=3000;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

//app.use(cookieParser());
app.get("/", (request, response) => {
	response.redirect("/feeds")
})

require(__dirname + '/controllers/index')(app);

app.listen(PORT, () => {
    console.log(`server getting started on port number ${PORT}`);
});