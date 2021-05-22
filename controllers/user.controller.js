const { User } = require('../models');
const addUser = async (req, res) => {
    try {
        const user = await User.create({
            f_uid : req.params.id,
        })
        res.send(user)        
    } catch (err) {
        res.json(err)
    } 
}

const findUsers = async (req, res) => {
    try {
        await User.findAll().then(data => {
            res.send(data)
        })
    } catch (error) {
        res.json(error)
    }
}


module.exports = { 
    addUser,
    findUsers
}