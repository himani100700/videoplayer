const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const api = require('./server/routes/api');

// const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname,'dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api' , api);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, "dist/booking-app/index.html"));
});

const port = process.env.PORT || '3046';
app.set('port', port);
const server = http.createServer(app);

app.listen(port, function(){
    console.log("Server is running on localhost:" + port);
})