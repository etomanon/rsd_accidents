const router = require('express').Router()
const checkAuth = require('../middleware/checkAuth')
const User = require('../models/user')
const cipher = require('../helpers/cipher')
const tokens = require('../helpers/tokens')

router.get('/', checkAuth, (req, res) => {
    const freeToken = cipher.decrypt(req.user.freeToken);
    res.status(200).json({
        user: req.user.username,
        email: req.user.email,
        freeToken: freeToken,
        hits: req.user.hits,
        dateToken: req.user.dateToken,
        format: req.user.format,
        srs: req.user.srs
    })
})

router.post('/token', checkAuth, (req, res) => {
    User.findOne({ 'email': req.user.email, 'username': req.user.username })
        .exec()
        .then(result => {
            tokens.createToken()
                .then(freeToken => {
                    result.freeToken = freeToken;
                    result.save();
                    res.status(200).json({
                        token: freeToken
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err.message
                    });
                })
            
        })
        .catch(err => {
            res.status(500).send({
                error: err.message
            });
        })
})

module.exports = router;