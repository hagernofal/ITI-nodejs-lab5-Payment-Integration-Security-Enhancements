const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routers/users');
const postRoutes = require("./routers/posts");
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());


app.use('/users', userRouter);
app.use("/posts", postRoutes); 


app.use(errorHandler);


const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Failed to connect to MongoDB');
            console.error(err);
        });

    console.log(`Server is running on Port: ${PORT}`);
});
