require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const compression = require('compression');
app.use(compression());
app.use(cors());
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect(process.env.MongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {})
    .catch(err => console.log(err));



let routes = require('./api/routes');
routes(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
})



app.listen(port, () => {
    console.log('Server lang nghe tai 8080');
})