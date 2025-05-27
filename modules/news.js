const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true, index:true},
    description:String,
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true, index:true},
    createdAt:{type:Date, default:Date.now}
})

newsSchema.index({user:1, createdAt:-1})
module.exports= mongoose.model("News", newsSchema)