const bodyParser = require('body-parser')
var cors = require('cors')
const express = require('express')

const app = express()
app.use(bodyParser.json());
app.use(cors());
const port = 4000
app.get('/', (req, res) => {
  res.send("Volunteer Network server site");
})
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.on0y8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("vlunteerNetwork").collection("userInfo");
  app.post('/addUser', (req, res) => {
    const register = req.body;
    collection.insertOne(register)
    .then(result => {
      res.send(result.insertedCount > 0);
    })
  })

app.get('/user', (req, res) => {
  collection.find({email: req.query.email})
  .toArray((err, documents) => {
    res.send(documents);
  })
})


app.get('/allUser', (req, res) => {
  collection.find({})
  .toArray((err, documents) => {
    res.send(documents);
  })
})

});

app.listen(process.env.PORT || port)