const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const profileController = require('../controllers/profiles')
const { ensureAuth, ensureGuest } = require('../middleware/auth')



router.get("/", ensureGuest, homeController.getIndex);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get('/signup/updateprofile', profileController.getUpdateProfile)
router.post("/updateprofile", profileController.updateProfile)

router.get("/profile", ensureAuth, profileController.getProfile);
router.get("/match", ensureAuth, profileController.getMatch);

module.exports = router