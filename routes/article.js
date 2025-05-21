const express = require("express")
const router = express.Router()
const Article = require('../modules/article')
const auth = require('../middleware/authMiddleware')
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName)
    }
})
const upload = multer({ storage })

router.get("/", async (req, res) => {
    try {
        const articles = await Article.find()
        const hostUrl = `${req.protocol}://${req.get("host")}`;
        const updatedArticles = articles.map((article)=>{
            return({
                ...article._doc,
                image:article.image ? `${hostUrl}/uploads/${article.image}`:null
            })
        })

        res.status(200).json({ message: "Fetched Article", articles:updatedArticles })
    }
    catch (err) {
        console.log("err", err)
    }
})

router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const articles = await Article.find({ user: userId })
        res.status(200).json({ message: "fetched article by user", articles })
    }
    catch (err) {
        console.log(err)
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const article = await Article.findById(id)
        if (!article) return res.status(404).json({ message: "Article not found" })
        res.json({ message: "Fetched Single Article", article })
    }
    catch (err) {
        console.log(err)
    }
})

router.post("/create", upload.single("image"), async (req, res) => {

    const { title, description, user } = req.body;
    const image = req.file ? req.file.filename : null;

    const article = await Article.findOne({ title })
    if (article) return res.status(400).json({ message: "This article already exit" })
    try {
        const newArticle = new Article({ image, title, description, user })
        await newArticle.save()

        res.status(201).json({
            message: "New Article Created", newArticle
        })
    }
    catch (err) {
        console.log("err", err)
    }
})


router.patch("/update/:id", async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params
    try {
        const updated = await Article.findByIdAndUpdate(id, { title, description }, { new: true })
        if (!updated) return res.status(404).json({ message: "Article not found" })
        res.json({ message: "Article Updated" }, updated)
    }
    catch (err) {
        console.log(err)
    }
})

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Article.findByIdAndDelete(id)
        if (!deleted) return res.status(404).json({ message: "Article not exit" })
        res.json({ message: "Article Deleted", deleted })
    }
    catch (err) {
        console.log("err", err)
    }
})

module.exports = router