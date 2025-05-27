const express = require("express")
const router = express.Router()
const News = require('../modules/news')

router.get("/", async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 }).limit(5);
        res.json({ message: "fetched all news", news })
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const news = await News.find({ user: userId })
        res.status(200).json({ message: "Fetched news user wise", news })
    }
    catch (err) {
        res.status(500).json({ err: err })
    }
})

router.get("/getSingle/:id", async (req, res) => {
    const { id } = req.params

    try {
        const news = await News.findById(id)
        if (!news) return res.status(400).json({ message: "New not exit" })
        res.status(200).json({ message: "Fetched Single News", news })
    }
    catch (err) {
        console.log("err", err)
    }
})

router.get("/aggregation/newsCountByUser", async (req, res) => {
    try {
        const result = await News.aggregate([
            {
                $group: {
                    _id: "$user", // group by user
                    newsCount: { $sum: 1 },
                }
            },
            {
                $lookup: {
                    from: "users", // collection name
                    localField: "_id",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            },
            {
                $project: {
                    _id: 0,
                    userId: "$userDetails._id",
                    userName: "$userDetails.name",
                    newsCount: 1
                }
            }
        ]);
        res.json({ message: "News count by user", result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});


router.post("/create", async (req, res) => {
    const { title, description, user } = req.body;
    const news = await News.findOne({ title })

    if (news) return res.status(400).json({ message: "This news already exit" });

    try {
        const newNews = new News({ title, description, user })
        await newNews.save()
        res.status(201).json({ message: "News Created successfully", newNews })
    }
    catch (err) {
        console.log("err", err)
    }
})

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updated = await News.findByIdAndUpdate(id, { title, description }, { new: true })
        if (!updated) return res.status(404).json({ message: "New not found" })
        res.json({ message: "New Updated Successfully", updated })
    }
    catch (err) {
        console.log(err)
    }
})

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNews = await News.findByIdAndDelete(id)
        if (!deletedNews) return res.status(404).json("This new already deleted")
        res.json({ message: "News deleted successfully", deletedNews })
    }
    catch (err) {
        console.log("err", err)
    }

})
router.delete("/delete/old", async (req, res)=>{
    try{

    }
    catch(err){
        console.log("error", err)
    }
})

module.exports = router;