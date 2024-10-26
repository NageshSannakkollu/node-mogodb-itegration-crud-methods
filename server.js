const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose")
const employeeRoutes = require("./routes/employeeRoutes");
const bodyParser = require("body-parser");

const app = express()
const port = 3006;

dotEnv.config()
app.use(bodyParser.json())
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Mongodb Connected Successfully")
})
.catch((error)=> {
    console.log(`Mongodb error: ${error}`)
})

app.use("/employees",employeeRoutes)

app.listen(port, () => {
    console.log(`Server Running at :http://localhost:${port}`);
});