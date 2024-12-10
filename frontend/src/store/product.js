import {create} from "zustand"

export const useProductStore = create((set) =>({
    products: [],
    setProducts: (products) =>set({products}),
    createProduct: async (newProduct)=>{
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success: "false", message: "Por favor, preencha todos os campos."}
        }
        const resposta = await fetch("/api/products", { //aqui, o server do vite vai completar com o localhost
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(newProduct)
        }) 
        const data = await resposta.json();
        set((state) => ({products: [...state.products, data.data]})); //nos controladores, ta definida a criação como "data", por isso data.data
        return {success:"true", message:"Tarefa criada."}
    }
}))
