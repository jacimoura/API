import { Container, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
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

      <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"} color={"gray.500"} >
        Nenhuma tarefa por fazer.{" "}
        <Link to={"/create"}>
          <Text as='span' color='blue.500' _hover={{ textDecoration: "underline"}}>
            
            <br></br>Criar uma Tarefa
            </Text>
        </Link>
      </Text>
      </VStack>
    </Container>
  )
}

export default HomePage