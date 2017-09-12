const express = require('express');
const app = express();

/* middleware */
const morgan = require('morgan');
const redirectHttp = require('./redirect-http')();
const checkDb = require('./check-connection')();
// const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

app.use(morgan('dev'));
// app.use(bodyParser.json());
if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttp);
}
app.use(express.static('./public'));

// const images = require('./routes/images');
// app.use((req, res) => {
//     res.sendFile('index.html', {
//         root: './public/',
//     });
// });

const category = require('./routes/categories');
const expense = require('./routes/expenses');
app.use(checkDb);
app.use('/api/categories', category);
app.use('/api/expenses', expense);

app.use(errorHandler());

module.exports = app;