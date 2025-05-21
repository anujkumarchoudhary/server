const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    image:String,
    title: { type: String, required:true },
    description: { type: String, required:true },
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true}
}, { timestamps: true })

module.exports= mongoose.model("Article", articleSchema)