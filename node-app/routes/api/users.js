// login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const keys = require("../../config/keys");
const User = require("../../models/User");
const passport = require("passport");
// $route GET  api/users/test.json
// @desc 返回请求的json数据
// @access public
router.get("/test.json", (req, res)=>{
    res.json({msg:"login works"});
});

// $route POST  api/users/register.json
// @desc 返回请求的json数据
// @access public
router.post("/register.json", (req, res)=>{
//    console.log(req.body);
    // 查询数据库中是否拥有邮箱
    User.findOne({email: req.body.email})
        .then((user)=>{
            if(user){
                return res.status(400).json({msg:"注册失败,该邮箱已被注册!"})
            } else {
                
                const avatar =  gravatar.url('req.body.email',
                 {s: '200', r: 'pg', d: 'mm'});

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
                });

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        // 加密成功
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                               .then(user => res.json(user))
                               .catch(err => console.log(err))
                              
                    });
                });


            }
        })
});

/**
 * @route POST api/users/login.json
 * @desc 返回 token jwt passport
 * @access public
 */
router.post("/login.json", (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    // 查询数据库
    User.findOne({email})
    .then( user => {
        if(!user){
            return res.status(404).json({msg:"用户不存在"})
        }
        // 密码匹配
        bcrypt.compare(password, user.password)
        .then( isMatch =>{
            if(isMatch){
                const rule = {
                     id:user.id,
                     name:user.name, 
                     email: user.email,
                     avatar: user.avatar,
                     identity: user.identity
                    }
                //jwt.sign("规则","加密的名字","过期时间","箭头函数")
                jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) =>{
                    if(err) throw err;
                    res.json({
                        msg: "login success",
                        token:"Bearer " + token
                    })
                })
            } else{
                return res.status(400).json({msg:"密码错误"})
            }
        })
    })
})

/**
 * @route GET api/users/current.json
 * @desc return current userInfo
 * @access private
 */
router.get("/current.json",passport.authenticate("jwt",{session:false}),(req, res)=>{
    res.json(
       {
        msg: "token 解析成功",
        data: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            identity: req.user.identity
        }
       }
    )
})

module.exports = router;