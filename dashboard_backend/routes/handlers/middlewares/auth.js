import jwt from 'jsonwebtoken'

export default function (req, res, next) {
    try {
        const { authorization } = req.headers
        req.user = jwt.verify(authorization, process.env.TOKEN_SECRET_KEY);
        next()
    } catch (err) {
        console.log('Error: ', err)
        res.status(401).send('Unauthorized.')
    }
}