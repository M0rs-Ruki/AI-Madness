
import express from "express";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config({path: "./.env"});
const app = express();
const port = process.env.PORT;


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


import index from "./src/routes/indexRoutes.js";

app.get('/', index);


app.listen(port, () => {
    console.log(`The app is runing on ${port}: http://localhost:${port}`);
})