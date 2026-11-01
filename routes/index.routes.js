const router = require("express").Router()
const Entry = require('../models/Entry.js')
const isSignedIn = require('../middleware/is-signed-in.js')


router.get('/',(req,res)=>{
    res.render('homepage.ejs')
})

router.get('/my-entries', isSignedIn, async (req, res) => {
    try {
        // only entries owned by the logged in user
        const entries = await Entry.find({ owner: req.session.user._id })
        res.render('entries/my-entries.ejs', { entries })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})



module.exports = router;
