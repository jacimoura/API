
//criar o esquema de formação de objetos para o MongoDB
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
}, {
        timestamps: true //guardar registros de atividade no DB
    },);

    const Product=mongoose.model('Product', productSchema);
    export default Product;