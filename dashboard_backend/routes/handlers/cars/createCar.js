import { auth } from './../middlewares'

async function getCars (req, res) {
    try {
        const { brand, model, year, color } = req.body;
        const car = await global.CARS.create({ brand, model, year, color }, {returning: true});
        res.json(car);
    } catch (e) {
        console.error(e);
        res.status(500).send('Something broke!');
    }

}


export default {
    method: 'post',
    route: '/',
    middlewares: [auth],
    handler: getCars
}