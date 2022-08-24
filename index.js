import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./api/config/db.js";
import path from "path";
import AppError from "./api/utils/appError.js";
import globalErrorHandler from "./api/controller/ErrorController.js";
import talukroutes from "./api/routes/talukRoutes.js";
import growerroutes from "./api/routes/growerRoutes.js";
import userroutes from "./api/routes/userRoutes.js";
import { handler } from "./api/views/admin/build/handler.js";
dotenv.config();
connectDB();
const __dirname = path.resolve();

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
// app.use(express.urlencoded({ extended: false }))
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    console.log(req.header)
    req.requestTime = new Date().toISOString();
    next();
});
// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server started on port - " + port));

// Routes
app.use("/api/v1/taluks", talukroutes);
app.use("/api/v1/growers", growerroutes);
app.use("/api/v1/users", userroutes);
// Connect sveltekit with express app
app.use(handler);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
