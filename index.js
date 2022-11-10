const express = require("express")
require('dotenv').config()
const app = express()
const cors = require('cors')
app.use(cors())
const jwt = require("jsonwebtoken")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const auth = require("./auth")
const uri = process.env.DB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
    res.send("its working")
})
