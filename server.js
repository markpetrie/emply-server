// const http = require('http');
// 
const http = require('http');
require('dotenv').config();
const app = require('./lib/app');
const connect = require('./lib/connect');
connect(process.env.MONGODB_URI);
const server = http.createServer(app);
const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log('server is running on', server.address().port); //eslint-disable-line
});