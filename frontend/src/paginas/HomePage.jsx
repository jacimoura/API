import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import CartaoAtividade from "../componentes/CartaoAtividade";

const HomePage = () => {
  const {fetchProducts, products} = useProductStore();

  useEffect(()=>{
    fetchProducts();
  },[fetchProducts]);
  console.log("products", products);

  return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                  fontSize={{base:"22", sm:"28"}}
                  fontWeight='bold'
                  textTransform={"uppercase"}
                  textAlign={"center"}
                  bgGradient={"linear(to-r, cyan.400, #FF0080)"}
                  bgClip={"text"}
                >
                  Tarefas atuais:
                </Text>

                <SimpleGrid
                columns={{
                  base: 1,
                  med: 2,
                  lg:3
                }}
                spacing={10}
                w={"full"}
                >
                {products.map((product)=>(
                    <CartaoAtividade key={product._id} product={product}/>
                  ))}
                </SimpleGrid>
                {products.length === 0 && <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"} color={"gray.500"} >
                  Nenhuma tarefa por fazer.{" "}
                  <Link to={"/create"}>
                    <Text as='span' color='blue.500' _hover={{ textDecoration: "underline"}}>
                      
                      <br></br>Criar uma Tarefa
                      </Text>
                  </Link>
                </Text>
              }
            </VStack>
        </Container>
  )
}

export default HomePage