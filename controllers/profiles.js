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
            let matched = []
            const match = req.user.matchedUsers
            for (let i = 0; i < match.length; i++) {
                const user = await User.findById(match[i])
                const foundUser = {
                    username: user.userName,
                    likedgames: user.likedGames,
                    consoles: user.consoles
                }
                matched.push(foundUser)

            }
            console.log(matched)
            res.render("profile.ejs", { user: req.user, matchedUsers: matched });
        } catch (err) {
            console.log(err);
        }
    },
}