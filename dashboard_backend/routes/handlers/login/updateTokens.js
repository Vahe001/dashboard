import { verify } from './../../helpers/index'
import jwt from 'jsonwebtoken'
import config from './../../../config/index'
async function login (req, res) {
    try {
        const { refreshToken } = req.headers;
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)
        const user = await global.USERS.findOne({
            where: {email: decoded.id},
        })
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET_KEY, {expiresIn: config.tokenExpireTime})
        const refresh_token = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: config.refreshTokenExpireTime})
        res.json({token, refreshToken: refresh_token})
    } catch (e) {
        if(e.name && (e.name === 'TokenExpiredError' || e.name === 'JsonWebTokenError'))
            res.status(401).send('Unauthorized.')

        console.error(e);
        res.status(500).send('Something broke!');
    }
}


export default {
    method: 'post',
    route: '/login',
    handler: login
}