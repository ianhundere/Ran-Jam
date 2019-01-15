require('dotenv').config();

// Required Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
app.use(helmet());
app.use(express.static('public'));

const morgan = require('morgan');
const path = require('path');

require('./db/config');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', require('./routes/index'));
// app.use('/auth', require('./routes/auth'));

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});
