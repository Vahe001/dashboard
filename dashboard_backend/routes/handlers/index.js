import login from './login'
import cars from './cars'

export default function (app) {
    app.use('/', login)
    app.use('/cars', cars)
}

