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
    },
    fetchProducts: async()=>{
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data});

    },
    deleteProduct: async (pid)=>{
        const res = await fetch(`/api/products/${pid}`,{
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        set(state =>({products: state.products.filter(product => product._id !== pid)})); // mudar o estado da página para eliminar o cartão da tarefa descartada
        return { success: true, message: data.message };
    },
    updateProduct: async (pid, updatedProduct) =>{
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
            });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message}
        set(state => ({
            products: state.products.map(product => product._id === pid ? data.data : product) // atualiza a UI para incluir a informação no produto editado
        }))
        return {success: true, message: data.message};
    },
}));
