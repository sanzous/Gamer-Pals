const User = require('../models/User');

module.exports = {
    getMatch: async (req, res) => {
        try {
            const user = await User.find({ user: req.user.id })
            User.count().exec(function (err, count) {

                // Get a random entry
                var random = Math.floor(Math.random() * count)

                // Again query all users but only fetch one offset by our random #
                User.findOne().skip(random).exec(
                    function (err, user) {
                        res.render("match.ejs", { user: user });
                        console.log(user)
                    })
            })
        } catch (err) {
            console.log(err)
        }
    }
}