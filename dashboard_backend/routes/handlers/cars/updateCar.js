import { auth } from './../middlewares'

async function updateCar (req, res) {
    try {
        const { id, brand, model, year, color } = req.body;
        const car = await global.CARS.update({ brand, model, year, color }, {where: { id }});
        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).send('Something broke!');
    }

}


export default {
    method: 'put',
    route: '/',
    middlewares: [auth],
    handler: updateCar
}