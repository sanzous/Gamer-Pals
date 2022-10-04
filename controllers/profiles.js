const cloudinary = require('../middleware/cloudinary');
const User = require('../models/User');

module.exports = {
    getUpdateProfile: async (req, res) => {
        try {
            const games = ['MMORPG', 'Open World Survival', 'ARPG', 'Strategy', 'FPS',
                'Party Games', 'Base Building', 'Sports', 'Fighting']
            const consoles = ['PC', 'Xbox', 'Playstation 4/5', 'Nintendo Switch', 'Handheld']
            res.render('updateprofile.ejs', { games: games, consoles: consoles })
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
                    likedGames: req.body.games,
                    consoles: req.body.consoles

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

            // const posts = await Post.find({ user: req.user.id });
            const user = await User.find({ user: req.user.id })
            console.log(req.user)
            res.render("profile.ejs", { user: req.user });
        } catch (err) {
            console.log(err);
        }
    },
}