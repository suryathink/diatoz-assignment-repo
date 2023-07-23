const express = require("express");

const {signup,login,verifyToken,getUserById,addImage,addTokenToBlacklist} = require("../controllers/authController");
const authorization = require("../middlewares/authorization");
const imageModel= require("../models/imageModel")
const blacklistTokenData = require("../models/blacklist");
const User = require("../models/userModel");
const mongoose = require('mongoose');
const authRouter = express.Router();



authRouter.get("/",async (req,res)=>{
  try {

    return res.status(201).send({
       message:'Hello From Backend'
          })
} catch (err) {


    return res.status(400).send({
        error:"Error Happened in Backend"
    })
}


});


authRouter.post("/signup", async(req, res) => {
    try {
        const { name, email,password} = req.body;
      
        let user = await signup(name, email,password)
   
        
        return res.status(201).send({
           message:'Registration Successful, Please Login',
           data:user
        })
    } catch (err) {
 
        let errorMessage = 'Something went wrong';

        if (err.message === 'User already exists') {
            errorMessage = 'User already exists,';
          }

        return res.status(400).send({
            error:errorMessage
        })
    }
});



authRouter.post("/login", async(req, res) => {
    try {
        
        const {email,password} = req.body;
      
        const data = await login(email, password);
     
             return res.send({
                message:'Login Successfull',
                data
             })

    } catch (err) {
   
        let errorMessage = 'Something went wrong, Either Email or password is Wrong';
        
        if (err.message === 'password does not match') {
            errorMessage = 'Password Does Not Match';
          } else if (err.message === 'User Already Present') {
            errorMessage = 'User with this email Does Not Exist';
          }

        return res.status(401).send({
          error: errorMessage,
        });
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
       
        
        return res.status(500).send({
            error:'Something went wrong'
        })
    }


});




authRouter.post('/getImages', authorization, async (req, res) => {
    try {
      // /getImages?page=1&itemsperpage=10
      const user = req.loggedInUser;

      const page = Number(req.body.page) || 1;
      const itemsperpage = 10;
    
      const startIndex = (page - 1) * itemsperpage;
    
      const images = await imageModel.find().skip(startIndex).limit(itemsperpage);
    
      res.status(200).json({
        images,
        user
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


   
  authRouter.post("/logout", authorization, async(req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        const data = await addTokenToBlacklist(token);
        
        return res.send({
           message:'Logout Successful',
           data
        })
    
    } catch (err) {
    
        return res.status(500).send({
            error:'Something went wrong'
        })
    }

   
  })


  

  authRouter.post("/favorite", authorization, async (req, res) => {
    try {
        const user = req.loggedInUser;
       

        const favoriteID = req.body.favID;
        if (!favoriteID) {
            return res.status(400).send({
                error: "Favorite ID not provided in the request body.",
            });
        }

        // Check if the favoriteID is already present in the favorites array
        const isFavorite = user.favorites.includes(favoriteID);
       
        if (isFavorite) {
            // Remove the favoriteID from the favorites array
            const updatedUser = await User.findOneAndUpdate(
                { email: user.email },
                { $pull: { favorites: favoriteID } },
                { new: true }
            ).select("-password");


            return res.send({
                message: "Item Removed from Favorites",
                user: updatedUser,
            });
            
        } else {
            // Add the favoriteID to the favorites array
            const updatedUser = await User.findOneAndUpdate(
                { email: user.email },
                { $push: { favorites: favoriteID } },
                { new: true }
            ).select("-password");

            return res.send({
                message: "Item added into favorites",
                user: updatedUser,
            });
        }
    } catch (err) {
     
        return res.status(500).send({
            error: "Something went wrong",
        });
    }
});


  authRouter.post("/getfavoritedata", authorization, async(req, res) => {
    try {
      const user = req.loggedInUser;
  
          return res.send({
             message:'favorite Data Sent',
             user
          })
    
    } catch (err) {
  
        return res.status(500).send({
            error:'Something went wrong'
        })
    }

   
  })

  


  authRouter.get('/getallData', async (req, res) => {
    try {     
      const images = await imageModel.find()
    
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
module.exports = authRouter;
