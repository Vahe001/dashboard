import express from 'express';
import bodyParser from 'body-parser'
import initializeRoutes from './routes/handlers';
import dotenv from 'dotenv';
import initializeDb from './db'
import cors from 'cors'

dotenv.config();
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({
    extended: true,
}));

(async () => {
    await initializeDb();
    await initializeRoutes(app);
    app.listen(process.env.PORT, () => console.log('listening on port ', process.env.PORT))

})();

