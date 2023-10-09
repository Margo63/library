const express = require("express");
const fs = require("fs");
let books = require("./data.json");
const router = express.Router();

router.get("/books", (req, res, next) => {
    //res.send(books)
    //console.log(JSON.stringify(books))
    res.render("index.ejs", {listData :books, maxId: 0, stringListData: JSON.stringify(books)})
});

router.post("/books",
    (req, res)=>{
    let max = 0
    books.map((b)=>{
        if(max<b.id){
            max = b.id
        }
    })
    req.body.id = max+1;
    books[max+1]=req.body;
    //console.log(typeof books);
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

    var newBody = req.body
    //console.log(req.body)
    if(req.body.whatChange === "book"){
        books[changeIndex]["name"] = newBody.name
        books[changeIndex]["author"] = newBody.author
        books[changeIndex]["dateCreate"] = newBody.dateCreate
        books[changeIndex]["description"] = newBody.description
    }else if(req.body.whatChange === "user"){
        //console.log(newBody.isInLib)
        books[changeIndex]["isInLib"] = newBody.isInLib
    }




    console.log(books)
});


module.exports = router;

