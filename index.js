const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('MongoDB Server is Running')
})




const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DV_PASSWORD}@cluster0.dfmvdpa.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        const dataCollection = client.db('userCollection').collection('products');

        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = dataCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await dataCollection.insertOne(user)
            res.send(result)
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await dataCollection.deleteOne(query);
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(error => console.log(error))



app.listen(port, () => {
    console.log('Server is Running on port ', port);
})