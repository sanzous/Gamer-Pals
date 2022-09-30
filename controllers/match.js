const { calculateObjectSize } = require('bson');
const { findByIdAndUpdate } = require('../models/User');
const User = require('../models/User');


module.exports = {
    getMatch: async (req, res) => {
        try {
            const user = await User.find()
            req.user.matchedUsers.forEach(e => console.log(e))
            let arr = []
            for (let i = 0; i < user.length; i++) {
                arr.push(user[i].id)
            }
            arr = arr.filter(e => e !== req.user.id)
            arr = arr.filter(e => !req.user.matchedUsers.includes(e))
            arr = arr.filter(e => !req.user.rejectedUsers.includes(e))
            console.log(arr.length)


            //     // Get a random entry
            const random = Math.floor(Math.random() * arr.length)
            const randomUser = arr[random]
            console.log('random:' + randomUser)

            User.findById(randomUser).exec(
                function (err, user) {
                    res.render('match.ejs', { user: user })
                    console.log(user)
                }
            )




        } catch (err) {
            console.log(err)
        }
    },

    acceptMatch: async (req, res) => {
        User.findByIdAndUpdate(
            req.user.id,
            { $push: { matchedUsers: req.params.id } },
            { safe: true, upsert: true },
            function (err, model) {
                if (err) {
                    console.log(err)
                }
                console.log(model)
            }
        )
        res.redirect('/match')
    },

    rejectMatch: (req, res) => {
        console.log('reject')
        User.findByIdAndUpdate(
            req.user.id,
            { $push: { rejectedUsers: req.params.id } },
            { safe: true, upsert: true },
            function (err, model) {
                if (err) {
                    console.log(err)
                }
                console.log(model)
            }
        )
        res.redirect('/match')
    }
}