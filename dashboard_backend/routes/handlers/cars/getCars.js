import { auth } from './../middlewares'

async function getCars (req, res) {
    try {
        const {limit = 20, offset = 0} = req.query;
        const cars = await global.CARS.findAll({limit, offset});
        res.json(cars);
    } catch (e) {
        console.error(e);
        res.status(500).send('Something broke!');
    }

}


export default {
    method: 'get',
    route: '/',
    middlewares: [auth],
    handler: getCars
}