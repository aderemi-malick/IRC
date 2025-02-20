import { password } from 'bun';

const express = require('express');
const mongoClient = require('mongodb').MongoClient
const cors = require('cors')
const multer = require('multer')

let app = express()
app.use(cors())

let CONNECTION_STRING ="mongodb+srv://malickaderemi:malickaderemi@irc.lkr9u.mongodb.net/"

let DATABASENAME ="sample_mflix" // test database
let database

app.listen(8080, function () {
    mongoClient.connect(CONNECTION_STRING,(error, client)=>{
        database = client.db(DATABASENAME)
        console.log("MongoDB Connection successful")
    })

})

app.get('/api/sample/GetMovies', (req, res)=>{
    database.collection("movies").find({}).toArray((error, result)=>{
        res.send(result)
    })
})

app.post('/api/sample/AddUsers', multer().none(),  (req, res)=>{
    database.collection("users").count({}, async function (error, numOfDocs){
        await database.collection("users").insertOne({
            id:(numOfDocs+1).toString(),
            name: "Robby",
            email: "robby@mlm.com",
            password: "mlm##asdfghjkl##"
        })
        res.json("Added suceessfully")
    })
})

app.delete('/api/sample/AddUsers', multer().none(),  (req, res)=>{
    database.collection("users").count({}, async function (error, numOfDocs){
        await database.collection("users").insertOne({
            id: (numOfDocs-1).toString()
        })
        res.json("Deleted suceessfully")
    })
})


app.get('/users', (req, res)=>{
    database.collection("room").find({}).toArray((error, result)=>{
        res.send(result)
    })
})

app.get('/list', (req, res)=>{
    database.collection("room").find({}).toArray((error, result)=>{
        res.send(result)
    })
})