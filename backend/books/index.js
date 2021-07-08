const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));

app.use(require('./src/route'))

//const host = process.env.HOST || '35.192.185.7';
const host = '35.192.185.7';
const db = process.env.DB || 'BackendSAGrupo4';
const puerto = process.env.PORTdb || 27017;

const dbConnectionUrl = `mongodb://${host}:${puerto}/${db}`;
mongoose.connect(dbConnectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

var dbcon = mongoose.connection;

dbcon.on('error', function (err) {
  console.log('connection error', err)
})

dbcon.once('open', function () {
  console.log('Connection to DB successful')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})