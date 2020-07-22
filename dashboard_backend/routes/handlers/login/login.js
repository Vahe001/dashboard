import { verify } from './../../helpers/index'
import jwt from 'jsonwebtoken'
import config from './../../../config/index'
async function login (req, res) {
    try {
        const { googleToken } = req.body;
        let userData = await verify(googleToken)
        const [user, created] =  await global.USERS.findOrCreate({
            where: {email: userData.email},
            defaults: {
                email: userData.email,
                name: userData.name,
                picture: userData.picture
            }
        })
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET_KEY, {expiresIn: config.tokenExpireTime})
        res.json({user, token})
    } catch (e) {
        console.error(e);
        res.status(500).send('Something broke!');
    }

}


export default {
    method: 'post',
    route: '/login',
    handler: login
}