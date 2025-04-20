const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const authRouter = require('./routers/authRouter');
const postRouter = require('./routers/postRouter');
const userRouter = require('./routers/userRouter');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Configuration
dotenv.config();

const app = express();
//middlewares
app.use(express.json({ limit: '50mb' })); // Increase payload size limit
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Increase payload size limit for URL-encoded data
app.use(morgan('common'));
app.use(cookieParser());

let origin = 'https://fronted-dev.onrender.com';

app.use(
  cors({
    credentials: true,
    origin,
  }),
);

//Route
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.status(200).send('server is start');
});
const Port = process.env.PORT || 4000;
//databaseconnection
dbConnect();
app.listen(Port, (err, res) => {
  console.log(`server listening is start on ${process.env.PORT}`);
});
