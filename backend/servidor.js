import express from 'express';
import dotenv from 'dotenv';
import path from "path";

import { conectaDB } from './configura/db.js';
import rotaProdutos from "./rotas/rotas.produtos.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json()); //utilizar json no corpo da requisição
app.use("/api/products/", rotaProdutos);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    }) // irá retornar a aplicação de react
}
app.listen(PORT,()=>{
    conectaDB();
    console.log("Server started at http://localhost:"+PORT);
}); 

