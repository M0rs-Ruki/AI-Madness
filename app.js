
import express from "express";
import dotenv from "dotenv";
import { log } from "console";
import connectDB from "./src/db/db.js";


dotenv.config({path: "./.env"});
const app = express();
const port = process.env.PORT;


// Connect MongoDB
connectDB()
.then(() => {
    app.listen(port, () => {
        log(`The app is runing on ${port}: http://localhost:${port}`);
    });
    app.on("error", (err) => {
        console.log(`MongoDB connection error: ${err.message}`);
        process.exit(1);
    })
})
.catch((err) => {
    log(`MongoDB connection error: ${err}`)
});




// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');



// Routes
import index from "./src/routes/indexRoutes.js";


app.get('/', index);