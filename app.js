import express from 'express';
import path, {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import ejs from 'ejs'
import {init} from './scrapping.js'

export const page = await init();
const app = express();
const PORT = 5000;
const __DIRNAME = dirname(fileURLToPath(import.meta.url))

app.set('view engine', 'ejs');
app.use(routes);
app.use(express.json());
app.use(express.static(join(__DIRNAME, 'public')))
app.use(express.urlencoded({ extended: false }));

import routes from './routes/routes.js';

app.listen(process.env.PORT || PORT, ()=> console.log(`escuchando en el puerto: ${process.env.PORT || PORT}`))

