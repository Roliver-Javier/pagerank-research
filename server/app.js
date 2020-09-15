const express = require('express');
const bodyParser = require('body-parser');
const rankRoutes = require('./routes/rank');
const dotenv = require('dotenv');

dotenv.config();
const cors = require('cors');
const app = express();
const port = process.env.PORT | 3000;
console.log(port);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(rankRoutes);
app.listen(port, () => console.log(port));
