const express = require("express");

const {signup,login,verifyToken,getUserById,addImage} = require("../controllers/authController");
const authorization = require("../middlewares/authorization");
const imageModel= require("../models/imageModel")

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




authRouter.get('/getImages', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const itemsPerPage = 10;
    
      const startIndex = (page - 1) * itemsPerPage;
    
      const images = await imageModel.find().skip(startIndex).limit(itemsPerPage);
    
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = authRouter;
