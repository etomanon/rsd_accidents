const uuid = require('uuid')

const cipher = require('../helpers/cipher')

const User = require('../models/user');

const tokens = {
    createToken: (resolve, reject) => {
        if (resolve && reject) {
            return tokens.checkToken(resolve, reject);
        }
        return new Promise((resolve, reject) => {
            return tokens.checkToken(resolve, reject);
        })
    },
    checkToken: (resolve, reject) => {
        const token = uuid.v4();
        const freeToken = cipher.encrypt(token);
        User.findOne({ freeToken })
            .then(userObject => {
                if (userObject) {
                    return tokens.createToken(resolve, reject);
                }
                resolve(freeToken);
            })
            .catch(err => {
                reject(err);
            })
    }
}

module.exports = tokens;