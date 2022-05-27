const express = require('express');
const app = express();

const cors = require('cors');

const port = 3000;

//middlewares
app.use(express.json(), cors());


//routes
app.use(require('./routes/index'));

app.get('/users/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'});
  });
app.listen(8000, function () {
    console.log('CORS-enabled web server listening on port 8000');
  });

app.listen(port, () => {
    console.log('En el puerto: ' + port);
});