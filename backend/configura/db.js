import mongoose from "mongoose";

export const conectaDB = async()=>{
    try{
        const coneccao = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB conectado em: ${coneccao.connection.host}`);
    } catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1); //1 fecha por erro, 0 é um sucesso
    }
};