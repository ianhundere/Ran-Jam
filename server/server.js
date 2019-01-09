require('dotenv').config();

// Required Modules
const express = require('express');
const app = express();
const helmet = require('helmet');
app.use(helmet());

const morgan = require('morgan');
const path = require('path');

require('./db/config');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});
