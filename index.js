import express,{urlencoded} from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 4000;
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import authRouter from "./routes/authRouter.js"
import dbConnect from './config/dbConnect.js';
dbConnect();
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter)

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {console.log('Server litening on port', PORT);});