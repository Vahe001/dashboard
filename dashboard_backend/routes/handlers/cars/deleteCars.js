import { auth } from './../middlewares'
const { Op } = require("sequelize");

async function deleteCars (req, res) {
    try {
        const { carIds } = req.body;
        const deleteResponce = await global.CARS.destroy({where: {id: {[Op.in]: carIds}}});
        res.json(deleteResponce);
    } catch (e) {
        console.error(e);
        res.status(500).send('Something broke!');
    }

}


export default {
    method: 'delete',
    route: '/',
    middlewares: [auth],
    handler: deleteCars
}