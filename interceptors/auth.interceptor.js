const jwt = require('jsonwebtoken')
const participant = require('../models/participants.model')
const ENV = require('../config/env');

const auth = async(req, res, next) => {
    const headerAuth = req.header('Authorization');
    if(!headerAuth){
        res.status(401).json({ error: 'Not Authorized' })
        return;
    }
    const token = headerAuth.replace('Bearer ', '')
    try {
        const data = jwt.verify(token, ENV.JWT_KEY)
        const result = await participant.participantExists(data.email);
        if (result) {
            req.sessionEmail = data.email;
            next();
            return;
        }
    } catch(e) {

    }
    res.status(401).json({ error: 'Not Authorized' })
    return;
    

}
module.exports = auth