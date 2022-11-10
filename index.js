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
client.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
    else {
        const db = client.db("test");

        // Routes
        app.get('/users', async (req, res) => {
            const users = await db.collection("users").find().toArray()
            res.json({ status: "success", data: users })
        })
    
        // // get 3 services for Home
        app.get('/services/home', async (req, res) => {
            let services = await (await db.collection("services").find().toArray())
             
            res.json({ status: "success", data: services.slice(-3).reverse() })
        })
        // get all services
        app.get('/services', async (req, res) => {
            const services = await (await db.collection("services").find().toArray()).reverse()
            res.json({ status: "success", data: services })
        })
        // / get one service
        app.get('/service/:id', async (req, res) => {
            let { id } = req.params
            const service = await (db.collection("services").findOne(ObjectId(id)))
            res.json({ status: "success", data: service })
        })
          // Add a service
          app.post('/addservice', async (req, res) => {
            let { title, shortdescription, longdescription, price, rating, bannerimage, mainimage } = req.body
            let myobj = { title, shortdescription, longdescription, price, rating, bannerimage, mainimage }
            db.collection("services").insertOne(myobj, (err, result) => {
                if (!err) {
                    res.send(result)
                }
                else {
                    res.send(err)
                }
            })
        })