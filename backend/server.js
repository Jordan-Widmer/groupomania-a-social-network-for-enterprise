const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const connectDB = require('./config/db');
app.use(morgan('dev'));
const cors = require('cors');


// Init Middleware
app.use(express.json({ limit: '50mb', extended: false }));
app.use(cors())
connectDB();

app.use('/api/uploads', express.static('uploads'))

app.use('/api/user', require('./routes/User'));
app.use('/api/feed', require('./routes/Feed'));
app.use('/api/auth/user', require('./routes/auth/user'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => { console.log('server started on port' + PORT) });


module.exports = server;