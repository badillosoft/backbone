const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const collections = {};

app.get("/api/:collection", (req, res) => {
    const coll = req.params.collection;
    collections[coll] = collections[coll] || [];
    res.send(collections[coll]);
});

app.post("/api/:collection", (req, res) => {
    const coll = req.params.collection;
    const doc = req.body;
    collections[coll] = collections[coll] || [];
    doc._id = Math.random().toString(32).slice(2);
    collections[coll].push(doc);
    res.send(doc);
});

app.get("/api/:collection/:id", (req, res) => {
    const coll = req.params.collection;
    const _id = req.params.id;
    collections[coll] = collections[coll] || [];
    const doc = collections[coll].filter(doc => doc._id === _id)[0];
    res.send(doc);
});

app.put("/api/:collection/:id", (req, res) => {
    const coll = req.params.collection;
    const _id = req.params.id;
    collections[coll] = collections[coll] || [];
    const doc = collections[coll].filter(doc => doc._id === _id)[0] || {};
    if (!doc._id) {
        collections[coll].push(req.body);
    } else {
        for (let key in req.body) {
            doc[key] = req.body[key];
        } 
    }
    res.send(doc);
});

app.listen(3000);