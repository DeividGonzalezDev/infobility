import { search } from "../scrapping.js";
import { page } from "../app.js";

export const renderHomePage = (req, res)=>{
    res.render('../public/index');
}

export const renderResults = async (req, res)=>{
    const query = req.params.query;
    const results = await search(page, query);
    res.send(results);
}