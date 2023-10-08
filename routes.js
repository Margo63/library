const express = require("express");
const fs = require("fs");
const books = require("./data.json");
const router = express.Router();

router.get("/books", (req, res, next) => {


    res.render("index.ejs", {listData :books, router: router})

    //console.log("Animal", JSON.stringify(lang));
    // const fs = require('fs')
    // const pathJson = 'data.json'
    //
    //
    // fs.readFile(pathJson, 'utf8', (err, file) => {
    //
    //     if (err) {
    //         console.error('Error while reading the file:', err)
    //         return
    //     }
    //     try {
    //         const data = JSON.parse(file)
    //         // output the parsed data
    //        // console.log(data)
    //         res.render("index.ejs", {listData :data,
    //                                                 router: router})
    //     } catch (err) {
    //         console.error('Error while parsing JSON data:', err)
    //     }
    // })


});

router.get("/books/:id([0-9]{1,})",
    (req, res)=>{

    //res.render("index.ejs", {listData :books, router: router})
    const book = books.filter((g)=>{
        if(g.id == req.params.id) return true;
    });
    res.status(200);
    res.send(book);
});


module.exports = router;

