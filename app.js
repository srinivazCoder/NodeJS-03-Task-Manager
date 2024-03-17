
const express = require('express');
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// middle ware
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).send("Task Manager App")
})

app.use("/api/v1/tasks", tasks)


app.use(notFound);
app.use(errorHandlerMiddleware);
const port =  5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`server is listening port ${port}`);
        })
            
    } catch (err) {
        console.log(err)
    }

}
start()
