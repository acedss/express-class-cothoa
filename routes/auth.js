var router = require('express').Router();

var bcrypt = require('bcryptjs');
var salt = 8

router.get('/register', async (req, res) => {
    res.render('auth/register', { layout: 'auth_layout' });
})
router.post('/register', async(req, res)=>{
    try {
        var 
    } catch (error) {
        
    }
})

module.exports = router;
