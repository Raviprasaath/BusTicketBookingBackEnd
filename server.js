require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');

app.use(cors());

app.use("/auth", require("./Routes/userRouter"));
app.use("/bookingData", require("./Routes/bookingRouter"));

mongoose.connect(process.env.MONGO_URI).then(()=> {
    app.listen(process.env.PORT, (error)=> {
        if(error) {
            console.error(error);
        }
        console.log(`Server Connected ${process.env.PORT}`)
    })
})