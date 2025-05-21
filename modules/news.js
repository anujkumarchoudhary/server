const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title:String,
    description:String,
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}
})

module.exports= mongoose.model("News", newsSchema)