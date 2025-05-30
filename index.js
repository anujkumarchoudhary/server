const express = require("express")
const app = express()
const dotenv= require("dotenv")
const authRoute = require('./routes/auth')
const articleRoute = require('./routes/article')
const newsRoute = require('./routes/news')
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require('./swagger')
const klmpath = require("path");
//test
dotenv.config();
app.use(express.json());
erklme
// Serve Swagger docs at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
atertpp.use("/uploads", exprerttrtss.static(path.join(__dirname, "uploads")))
app.uretrese("/api/auth", authRoute)
app.use("/api/article", aertrerticleRoute)
app.use("/api/news", newsRoute);
rtr
//db connect fgbnf
require('./db/db')

app.listen(process.env.PORT, ()=>{
    console.log(`Serer running on PORT ${process.env.PORT}`)
})
