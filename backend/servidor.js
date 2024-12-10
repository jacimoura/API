import express from 'express';
import dotenv from 'dotenv';
import { conectaDB } from './configura/db.js';
import rotaProdutos from "./rotas/rotas.produtos.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //utilizar json no corpo da requisição
app.use("/api/products", rotaProdutos);
app.listen(PORT,()=>{
    conectaDB();
    console.log("Server started at http://localhost:"+PORT);
}); 

