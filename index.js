const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://vlunteer123:arjun7686@cluster0.on0y8.mongodb.net/vlunteerNetwork?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("vlunteerNetwork").collection("userInfo");
  console.log('abc')
});

app.listen(port)