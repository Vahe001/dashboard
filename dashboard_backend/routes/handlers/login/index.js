import express from 'express'
import login from "./login";

const router = express.Router()

router[login.method](login.route, login.handler);

export default router