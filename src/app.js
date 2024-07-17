import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { BASE_URL, COOKIE } from './constants.js';
import { asyncHandler } from './utils/AsyncHandler.js';
import { axiosInstance } from './utils/AxiosInstance.js';

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

import udioRouter from './routes/udio.router.js';

//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/udio", udioRouter);


export { app }