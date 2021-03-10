//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//app config
    //allows us to write API routes
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1168272",
    key: "c802ed5d6d54df981a02",
    secret: "e476a9e1a70c3b44bdf9",
    cluster: "us2",
    useTLS: true
  });

//middleware
app.use(express.json());

//Corse headers - it allows the request to come from any endpoint
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*")
//     next();
// })


//DB config
const connection_URL = "mongodb+srv://admin:Fm2TXD0kIWZAVYmp@cluster0.3yebm.mongodb.net/whatsappdb?retryWrites=true&w=majority"
mongoose.connect(connection_URL, {
    //Make Mongoose's defalut index buid use createIndex() instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver
    useCreateIndex: true,
    //To use the new parse
    useNewUrlParser: true,
    //removes support for several connection options that are no longer relevant with the new topology engine
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("DB connected");

    const messageCollection = db.collection("messagecontents");
    const changeStream = messageCollection.watch();

    changeStream.on("change", (change) => {
        console.log("A change occured", change);

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log("Error triggering Pusher");
        }
    });
});

//???

//API routes
//200's -> Okay
//201's -> Created 
//404 -> Page not found
//500 -> if something breaks
app.get('/',(req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    });
});


//listener 
app.listen(port, ()=>console.log(`Listening on localhost:${port}`));