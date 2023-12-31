import express,{urlencoded} from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 4000;
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import authRouter from "./routes/authRouter.js"
import productRouter from "./routes/productRouter.js"
import blogRouter from "./routes/blogRouter.js"
import proCategoryRouter from "./routes/productCategoryRouter.js"
import blogCategoryRouter from "./routes/blogCategoryRouter.js"
import colorRouter from "./routes/colorRouter.js"
import Brand from './routes/brandRouter.js';
import coupan from './routes/couponRouter.js';
import contactRouter from './routes/contactRouter.js';
import dbConnect from './config/dbConnect.js';
import mongan from  "morgan"
dbConnect();
app.use(mongan("dev"))
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter)
app.use("/api/product", productRouter)
app.use("/api/blog", blogRouter)
app.use("/api/category", proCategoryRouter)
app.use("/api/blogcategory", blogCategoryRouter)
app.use("/api/brand", Brand)
app.use("/api/coupan", coupan)
app.use("/api/color", colorRouter)
app.use("/api/contact", contactRouter)

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {console.log('Server litening on port', PORT);});