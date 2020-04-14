const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");

router.get("/save.json",((req, res) =>{

    if(!req.query.name){
        res.json({
            code:"001",
            msg: "参数错误"
        });
        return;
    }
    const newBook = new Book({
        name: req.query.name ,
        number: req.query.number,
        author: req.query.author
    });

    newBook.save()
        .then((addressBook) =>{
            res.json({
                code: "200",
                msg: "新增成功",
                data: addressBook
            })
        })
        .catch(err=>{
           res.json({
               code:"003",
               msg:"系统报错",
               data: err
           })
        });
}));

router.get("/update.json",((req, res) => {
    Book.findOne({_id:req.query.id})
        .then(book => {
            res.json(book);
        })
}));

module.exports = router;