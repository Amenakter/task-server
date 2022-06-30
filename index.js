const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jn8ub.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const taskManager = client.db('taskmanager').collection('tasks');

        // get all datag
        app.get('/data', async (req, res) => {
            const query = {};
            const cursor = assignment12Collection.find(query)
            const allData = await cursor.toArray();
            res.send(allData);
        });

        //insert dataa 
        app.post('/data', async (req, res) => {
            const product = req.body;
            const result = await assignment12Collection.insertOne(product)
            res.send(result);
        });

        // get One data
        app.get('/data/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const oneData = await assignment12Collection.findOne(query);
            res.send(oneData);
        });



        //update or insert user orders
        app.put('/orders/:email', async (req, res) => {
            const user = req.body;
            const id = user.id;
            const filter = { id: id };
            const options = { upsert: true };
            const updatedoc = {
                $set: user,
            };
            const result = await userOrders.updateOne(filter, updatedoc, options);
            res.send({ result });
        });



        // delete order item
        app.delete('/allOrders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userOrders.deleteOne(query);
            res.send(result);
        })
    }
    finally { }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})