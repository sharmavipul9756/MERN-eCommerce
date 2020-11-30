const express = require("express");

const app = express();
const port = 8000;

app.get("/" , (req , res) => {
 
    return res.send("Welcome! to the Home page");

});


app.get("/admin" , (req,res) =>{
    return res.send("Hey! this is an admin");

})


app.get("/login" , (req , res) => {
 
    return res.send("Welcome! to the login page");

});

app.get("/sinup" , (req , res) => {
 
    return res.send("Welcome! to the sinup page");

});
app.get("/categories" , (req , res) => {
 
    return res.send("Welcome! to the login page");

});



app.listen(port, () => console.log('Example app Listening on port ${port}'));