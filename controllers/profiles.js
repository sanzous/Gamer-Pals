const cloudinary = require('../middleware/cloudinary');
const User = require('../models/User');

module.exports = {
    getUpdateProfile: async (req, res) => {
        try {
            res.render('updateprofile.ejs')
        } catch (error) {
            console.log(error)
        }
    },

    updateProfile: async (req, res) => {
        try {
            console.log(req.body)
            User.findByIdAndUpdate(req.user.id,
                {
                    timezone: req.body.timezone,
                    likedGames: req.body.game,
                    consoles: req.body.console
                },
                function (err, docs) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("Updated User:", docs)
                        res.redirect('/profile')
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },



    getProfile: async (req, res) => {
        try {
            console.log(req.user)
            // const posts = await Post.find({ user: req.user.id });
            const user = await User.find({ user: req.user.id })
            res.render("profile.ejs", { user: req.user });
        } catch (err) {
            console.log(err);
        }
    },

    getMatch: async (req, res) => {
        try {
            const user = await User.find({ user: req.user.id })
            res.render('match.ejs', { user: req.user })
        } catch (err) {
            console.log(err)
        }
    },
}