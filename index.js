const express = require("express")
const app = express()
const dotenv= require("dotenv")
const authRoute = require('./routes/auth')
const articleRoute = require('./routes/article')
const newsRoute = require('./routes/news')
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require('./swagger')
const path = require("path");
//test
dotenv.config();
app.use(express.json());

// Serve Swagger docs at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/api/auth", authRoute)
app.use("/api/article", articleRoute)
app.use("/api/news", newsRoute);

//db connect fgbnf
require('./db/db')

app.listen(process.env.PORT, ()=>{
    console.log(`Serer running on PORT ${process.env.PORT}`)
})
