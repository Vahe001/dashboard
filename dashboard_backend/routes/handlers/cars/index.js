import express from 'express'
import getCars from "./getCars";
import createCar from "./createCar";
import deleteCars from "./deleteCars";
import updateCar from "./updateCar";
const router = express.Router()

router[getCars.method](getCars.route, ...(getCars.middlewares || []), getCars.handler);
router[createCar.method](createCar.route, ...(createCar.middlewares || []), createCar.handler);
router[deleteCars.method](deleteCars.route, ...(deleteCars.middlewares || []), deleteCars.handler);
router[updateCar.method](updateCar.route, ...(updateCar.middlewares || []), updateCar.handler);

export default router