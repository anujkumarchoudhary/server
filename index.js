const express = require("express")
const mongoose=require("mongoose")
const app = express()
const dotenv= require("dotenv")
const authRoute = require('./routes/auth')
const articleRoute = require('./routes/article')
const newsRoute = require('./routes/news')
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require('./swagger')
const path = require("path")
dotenv.config()
app.use(express.json())

// Serve Swagger docs at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/auth", authRoute)
app.use("/api/article", articleRoute)
app.use("/api/news", newsRoute);

//db connect
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then(()=>{
    console.log("MongoDB connected")
    app.listen(process.env.PORT, ()=>{
        console.log(`Serer running on PORT ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("error", err)
})