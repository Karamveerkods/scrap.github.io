const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/scraper', (err, res) => {
    if (err) {
        console.log(err, 'mongoose error');
    } else {
        console.log('Mongoose Connected');
    }
});

module.exports = {
    mongoose
};