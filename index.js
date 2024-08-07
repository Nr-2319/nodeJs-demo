require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const path = require("path");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
console.log("env", process.env.DB_PASSWORD);

//db connection
main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
}
//Schema

//bodyParser
// middleware for
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);

/* for external react routes wild car - import path module */
server.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT, () => {
    console.log("server started");
});
