const User = require('../models/user');
const cipher = require('../helpers/cipher')

module.exports = (req, res, next) => {
    let token = req.body.apiKey;
    if(token === undefined) {
        token =  cipher.encrypt(req.query.key);
    }
    else {
        token = cipher.encrypt(req.body.apiKey);
    }
    User.find({ 'freeToken': token })
        .exec()
        .then(result => {
            if (result.length === 0) {
                return res.status(403).json({
                    message: 'wrong API key'
                })
            }
            let user = result[0]
            user.save();
            next();

        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })

}