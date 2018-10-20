const express = require('express');
require('dotenv').config();

const routes = require('./routes');

const app = express();
app.set('port', process.env.SERVER_PORT);

app.disable('x-powered-by');

app.use(routes);
app.use(express.json());



app.get('/', (req, res) => {
    res.json({ test: 'OK' });
});

app.listen(app.get('port'), () => console.log(`RestAPI running at ${app.get('port')}`));