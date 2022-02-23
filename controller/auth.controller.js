const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('../model/user')

require('dotenv').config()

module.exports.createUser = (req, res, next) => {
    console.log('Create User')

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            console.log(hash)
            const u = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            console.log(u)
            u.save()
                .then(() => res.status(201).json({ message: 'Created User' }))
                .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))
}

module.exports.authUser = (req, res, next) => {
    //console.log('Auth User')
    user.findOne({username: req.body.username})
        .then( user => {
            if(user){
                bcrypt.compare(req.body.password, user.password)
                    .then(ok => {
                        if(ok){
                            res.status(200).json({
                                id: user._id,
                                token: jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn:'48h' }, { algorithm: 'RS256'})
                            })
                        }else{
                            res.status(404).json({message: 'Incorrect Password'})
                        }
                    })
            }else{
                res.status(404).json({message: 'Incorrect User'})
        }
    })
}


/* 
User.findOne({ username: req.body.username })
        .then( user  => {
            bcrypt.compare(req.body.password, user.password)
                .then(
                    ok => {
                        if(ok){
                            res.status(200).json({
                                id: user._id,
                                token: jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn:'48h' }, { algorithm: 'RS256'})
                            })
                        }else{
                            res.status(404).json({message: 'Incorrect User'})
                        }
                    }
                )
                .catch(e => res.status(401).json({message: 'Incorrect Password'}))
        })
.catch(res.status(402).json({message: 'Unknown User'}))
*/

/* 
User.findOne({username: req.body.username})
        .then(validName => {
            if(validName){
                console.log('exist')
                //res.status(200).json({message: "exist"})
                bcrypt.compare(req.body.password, user.password)
                    .then(data => {
                        console.log(data)
                    })
            }else if(!validName){
                console.log('doesnt exist')
                res.status(400).json({message: "username does not exist"})
            }
})
*/


