var bcrypt = require('bcryptjs');
var salt = 8
var router = require('express').Router();
var UserModel = require('../models/UserModel');

router.get('/register', async (req, res) => {
    res.render('auth/register', { layout: 'auth_layout' });
})
router.post('/register', async (req, res) => {
    try {
        var userRegisteration = req.body;
        var hashedPassword = await bcrypt.hash(userRegisteration.password, salt);
        var user = {
            username: userRegisteration.username,
            password: hashedPassword,
            role: 'user'
        };
        await UserModel.create(user);
        res.redirect('/auth/login');
    } catch (error) {
        res.send("Error registering user: " + error);
    }
})

router.get('/login', async (req, res) => {
    res.render('auth/login', { layout: 'auth_layout' });
})
router.post('/login', async (req, res) => {
    try {
        var userLogin = req.body;
        var user = await UserModel.findOne({ username: userLogin.username });
        var hash = bcrypt.compareSync(userLogin.password, user.password);
        if (hash) {
            req.session.username = user.username;
            req.session.role = user.role;
            res.redirect('/');
            console.log("User logged in: " + user.username);
        } else {
            res.send("Invalid password");
        }
    } catch (error) {
        res.send("Error logging in: " + error);
    }
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});



module.exports = router;
