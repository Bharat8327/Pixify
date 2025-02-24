const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {success,error} = require("../utils/responseWrapper")

const logOutController = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies.jwt) {
            return res.send(error(400, "No token found"));
        }

        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true
        });

        return res.send(success(200, "Logged out successfully"));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};




const signupController = async (req,res)=>{
    try {
      const {name,email,password} = req.body;
      if(!email || !password || !name){
       return res.send(error(400,"All fields are required"));
      }

      const oldUser = await User.findOne({email});

      if(oldUser){
    //    return res.status(409).send("User is already Registered");
            return res.send(error(409,"User is already Registered"))
      }

      const hashPassword = await bcrypt.hash(password,10);

      const user = await User.create({
        name,
        email,
        password : hashPassword
      });

      return res.send(success(201,"user created successfully"));
      
    } catch (e) {
        return res.send(error(500,e.message));
        
    }
};

const loginController = async (req, res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.send(error(400,"All fields are Required"));
        }

        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.send(error(404,"user is not registered"));
        }
        const matched = await bcrypt.compare(password,user.password);
        if(!matched){
            return res.send(error(403,"Invalid Password"));
        }

        const accessToken  = generateWebToken({_id : user._id});
        const refreshToken = generateRefreshToken({_id : user._id});

        res.cookie('jwt',refreshToken,{
            httpOnly : true,/* fronted are not acces this cookies */
            secure : true /* for https certificate atach with secure certificate */ 
        })


        return res.send(success(200,{
            accessToken
        }));
       
    } catch (e) {
        return res.send(error(500,e.message));
    }
};

// this refresh token check validity of and genrate a new access token
const refreshAcessTokenController = async (req,res)=>{
    const cookies  = req.cookies;  // cookies throw access the refresh token // otherwise we are access throw the body for temporary ex=> const {refreshToken} req.body; this types throw access
    if(!cookies.jwt){
        return res.send(error(401,"Refresh token are required"));
    }
    const refreshToken = cookies.jwt;
    try {
        const decoded =  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_PRIVATE_KEY);
        const _id = decoded._id;
        const accessToken  = generateWebToken({_id});
       return res.send(success(201,{accessToken}));
    } catch (e) {
        console.log(e);
        return res.send(error(401,"Invalid Refresh token"));
    }
}

const generateWebToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '1d'
        });
        return token;
    } catch (error) {
        console.log(error);
    }
}

const generateRefreshToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
            expiresIn: '1y'
        });
        return token;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    signupController,
    loginController,
    refreshAcessTokenController,
    logOutController
};
