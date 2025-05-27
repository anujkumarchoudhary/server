const express = require('express');
const jwt = require("jsonwebtoken");
const User = require("../modules/user"); 
const auth = require('../middleware/authMiddleware');
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/", async (req, res)=>{
    try{
        const users = await User.find()
        res.json({message:"fetched users", users})
    }
    catch(err){
        console.log("err", err)
    }
})

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        console.log("Existing user found:", existingUser);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPass });
        await newUser.save();

        const payload = { user: { id: newUser.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: "use not found" })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "invalid credentials" })
            const payload= {user:{id:user.id}}
            const token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn:"1h"})
            res.json({token})
    }
    catch (err) {
        console.log("error", err)
    }
})

router.post("/forgot:token", async (req, res)=>{
    const {password}=req.body;
    const hatchedToken = crypto.createHash("sha256").update(req.params.body).digest("hex")
    try{

    }
    catch(err){
        console.log("err", err)
    }
})
module.exports = router;
