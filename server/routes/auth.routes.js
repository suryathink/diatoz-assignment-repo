const express = require("express");

const {signup,login,verifyToken,getUserById,addImage} = require("../controllers/authController");

const authRouter = express.Router();


authRouter.post("/signup", async(req, res) => {
    try {
        const { name, email,password} = req.body;
      
        let user = await signup(name, email,password)
        console.log(user);
        
        return res.status(201).send({
           message:'Registration Successful, Please Login',
           data:user
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            error:'Something went wrong'
        })
    }
});



authRouter.post("/login", async(req, res) => {
    try {
        const {email,password} = req.body;
      
        const data = await login(email, password);
        
        return res.send({
           message:'Login Successful',
           data
        })
    } catch (err) {
        console.log(err);
        
        return res.status(500).send({
            error:'Something went wrong, Either Email or password is Wrong'
        })
    }


});


authRouter.post("/sendimage", async(req, res) => {
    try {
        const {author,width,height,url,download_url} = req.body;
      
        const data = await addImage(author,width,height,url,download_url);
        
        return res.send({
           message:'Image Addition to Database Successful',
           data
        })
    } catch (err) {
        console.log(err);
        
        return res.status(500).send({
            error:'Something went wrong'
        })
    }


});



module.exports = authRouter;
