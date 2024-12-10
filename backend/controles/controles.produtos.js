import mongoose from "mongoose";
import Product from "../modelos/modelo_produto.js"

export const getProducts = async(req,res)=>{
    try{
        const products = await Product.find({});//irá retornar todos os produtos da DB
    res.status(201).json({success:true, data: products});
    }catch(error){
        console.log("Erro ao buscar os produtos.", error.message);
        res.status(500).json({success:false, message:"Problema no servidor ao buscar os itens."})
    }
};

export const postProducts = async(req, res)=>{
    const product = req.body;
    if(!product.name | !product.price | !product.image){
        return res.status(400).json({success:false, message:"Por favor, preencha todos os campos."});
    };

    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    }catch(error){
        console.error("Erro ao criar o produto: ", error.message);
        res.status(500).json({success:false, message:"Erro de servidor."});
    };
};

export const deleteProducts = async (req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Id de produto inválido."})
    } //condicional para o caso de o front não enviar o id por algum motivo.
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message:("Produto deletado.")})
    }catch(error){
        console.error("Erro ao deletar o produto: ", error.message);
        res.status(500).json({success:false, message:"Erro no servidor."})
    }
};

export const putProducts = async(req, res)=>{
    const {id}=req.params;
    const product =req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Id de produto inválido."})
    } //condicional para o caso de o front não enviar o id por algum motivo.
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
        console.log(updatedProduct);
    }catch(error){
        res.status(500).json({success:false, message:"Erro do servidor."})
    }
};