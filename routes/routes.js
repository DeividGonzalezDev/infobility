import { Router } from "express";
import { renderHomePage, renderResults} from "../helpers/routes.helpers.js";

const app = Router();

app.get('/', (req, res)=>renderHomePage(req, res));

app.get('/api/v1/:query', (req, res)=>renderResults(req,res))

//app.get('/en', (req, res)=>renderHomePageEnglish(req, res));

//app.get('/es', (req, res)=>renderHomePageSpanish(req, res));


export default app;