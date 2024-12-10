import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react"
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name:"",
    price:"",
    image:""
  });
  const toast = useToast();

  const {createProduct} = useProductStore();

  const handleAddProduct = async() =>{
    const {success, message} = await createProduct(newProduct);
    if(!success){
      toast({
        title: "Erro",
        description: message,
        status:"error",
        duration: 6000,
        isClosable: true
      })
    } else {
      toast({
        title: "Sucesso",
        description: message,
        status:"success",
        duration: 6000,
        isClosable: true,
      });
    };
    setNewProduct({name:"", price:"", image:""});
  }
  
  return <Container maxW={"container.sm"}>
    <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Criar nova tarefa
        </Heading>
        <Box w={"full"} bg={useColorModeValue("white", "grey.800")} p={6} rounded={"lg"} shadow={"md"} >
          <VStack spacing={4}>
            <Input
              placeholder='Tarefa/Evento'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
              placeholder='Horário'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input
              placeholder='Imagem'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Adicionar tarefa
            </Button>
          </VStack>
        </Box>
    </VStack>
  </Container>

}
export default CreatePage