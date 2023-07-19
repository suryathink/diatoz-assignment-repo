const bcrypt = require('bcryptjs');
const User = require("../models/userModel")
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const ImageModel = require("../models/imageModel")
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


function generateToken(user){
    let payload={
        _id: user._id,
        email: user.email,
        name: user.name,
    }
   console.log(payload);
   return jwt.sign(payload,JWT_SECRET)
}

function verifyToken(token){
    const payload =  jwt.verify(token,JWT_SECRET)
    return payload
}


async function signup(name,email,password){
  
    const alreadyExisting = await User.findOne({
     email
    });

    if (alreadyExisting){
        throw new Error('User already exists')
    }
    let user = await User.create({
        name,email,
        password : bcrypt.hashSync(password) 
    })
    user = user.toJSON();

    delete user.password;

   return user;
}


async function login(email,password){
    let user = await User.findOne({
        email
    })
    if (user){
         user = user.toJSON();
            if (bcrypt.compareSync(password, user.password)){
            delete user.password;
            return {
                data:{
                    token: generateToken(user),
                    user,
                }    
            }
        }else{
            throw new Error('password does not match')
        }
    }else{
       throw new Error("USER DOES NOT EXIST");
    }
}


async function getUserById(id){
    let user = await User.findById(id)
   
    user = user.toJSON();
    delete user.password;
    return user;
  }


  async function addImage(author,width,height,url,download_url){
 
    let image = await ImageModel.create({
        author,width,height,url,download_url 
     })
     image = image.toJSON();


    return image;
}

  module.exports = {
    signup,
    login,
    verifyToken,
    getUserById,
    addImage
}