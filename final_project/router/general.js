// 一般用户可以访问的路线的骨架实现

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
    if(!isValid(username)){
      users.push({"username":username, "password":password});
      return res.status(200).json({message:"User successfully registred. Now you can login!"})
    }else{
      return res.status(404).json({message:"User already exists."})
    }
  }
  res.status(404).json({message:"Unable to register user."})
});



// Get the book list available in the shop
public_users.get('/',async (req, res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  try{
    res.send(JSON.stringify({books},null,4));
  } catch(err){
    res.status(500).json({err})
  }
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async (req, res)=> {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  try{
  res.send(books[isbn])
  }catch(err){
    res.status(404).json({err:"Book details not found"})
  }
});
  
// Get book details based on author
public_users.get('/author/:author',async (req, res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const author = req.params.author;
  try{
  res.send("Author: " + books[author].author)
  }catch(err){
    res.status(404).json({err:"Book auther is not"})
  }
});

// Get all books based on title
public_users.get('/title/:title',async (req, res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const title = req.params.title;
  try{
  if(books[title]){
    res.status(200).json(books[title].title);
  }else{
    res.status(404).json({message: "Book not found"})
  }
}catch(err){
  res.status(404).json({err:"Can not find this title"})
}
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  // const isbn = req.params.isbn
  // const review = books[isbn].reviews
  // // for(const i = 0; i<review.length; i++){
  // //   res.send("Review: " + review[i])
  // // }
  // res.send(review[0])

  const isbn = req.params.isbn;

    if (books[isbn]) {
        res.status(200).json(books[isbn].reviews);
    } else {
        res.status(404).json({message: "Book not found"});
    }
  
});

module.exports.general = public_users;
