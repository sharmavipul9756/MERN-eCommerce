const User = require("../models/user")
const { check , validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const user = require("../models/user");
const { DocumentProvider } = require("mongoose");


exports.signup = (req , res) => {

    const errors = validationResult(req)

if(!errors.isEmpty()){
    return res.status(400).json({
        errors: errors.array()[0].msg
    })
}

    const user = User(req.body)
    user.save((err , user) => {
        if(err){
            return res.status(400).json({
                err : "Not able to see user in DB"
            })
        }

        res.json({
            name : user.name,
            email : user.email,
            id : user._id
        });
    });
};

exports.signin = (req , res) =>{
    const errors = validationResult(req)

const {email,password} = req.body;


if(!errors.isEmpty()){
    return res.status(422).json({
        errors: errors.array()[0].msg
    })
}

User.findOne({email}, (err , user) => {

    if(err || !user){
       return res.status(400).json({
            errors: "User E-mail does not exists"
        })
    }

    if(!user.authenticate(password)){
  return res.status(401).json({
    errors: "Password do not match"
})
    }
//creating token
    const token = jwt.sign({_id:user._id} , process.env.SECRET);

    //putting token in cookie

    res.cookie("token",token ,{expire : new Date() + 9999});

    //send response to frontend

    const {_id ,name,email,role} = user;
    return res.json({token,user:{_id,name,email,role}});

});

};

exports.signout = (req , res) => {
    res.clearCookie("token");
res.json({
    message:"User is Signed Out Successfully"
    });
 
};   


//protected routes

exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth"
});

// custom middleware
exports.isAuthenticated = (req,res,next) => {
let checker = req.profile && req.auth && req.profile._id == req.auth._id

if(!checker){
    return res.status(403).json({
        errors : "Access DENIED"
    })
}
    next();
}


exports.isAdmin = (req,res,next) => {

    if(req.profile.role === 0){
        return res.status(403).json({
            errors : "You Dont't have Access to that"
        })
    }

    next();
}
