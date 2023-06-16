import express,{urlencoded} from 'express';

const app = express();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 4000;
import authRouter from "./routes/authRouter.js"
import dbConnect from './config/dbConnect.js';
dbConnect();
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/api/user", authRouter)


app.listen(PORT, () => {console.log('Server litening on port', PORT);});