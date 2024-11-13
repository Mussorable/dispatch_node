require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./util/database');

const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

sequelize.sync({force: true})
    .then(() => {
        console.log('Database connected');
        app.listen(process.env.SERVER_PORT);
        console.log(`Listening on port ${process.env.SERVER_PORT}`);
    })
    .catch(error => {
        console.error(error);
    });