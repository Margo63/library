const express = require("express");
const fs = require("fs");
let books = require("./data.json");
const router = express.Router();

router.get("/books", (req, res, next) => {
    res.render("index.ejs", {listData :books, maxId: 0})
});

router.post("/books",
    (req, res)=>{
    books[books.length]=req.body;
    //console.log(books);
    //console.log(req.body);
});



router.get("/books/:id([0-9a-zA-Z]{1,})",
    (req, res)=>{
    const book = books.filter((g)=>{
        if(g.id == req.params.id) return true;
    });
    res.render("ui/book_card.ejs",{element :book[0]});
});


router.delete("/books/:id([0-9a-zA-Z]{1,})",
    (req, res)=>{
    const removeIndex = books.map((b)=>{
        return parseInt(b.id);
    }).indexOf(parseInt(req.params.id));
    delete books[removeIndex]
        //console.log(books);
});



router.put("/books/:id([0-9a-zA-Z]{1,})",(req,res)=>{
    const changeIndex = books.map((b)=>{
        return parseInt(b.id);
    }).indexOf(parseInt(req.params.id));
    books[changeIndex] = req.body
    console.log(req.body)
});


module.exports = router;

