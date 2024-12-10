import { Container, Flex, Text,  HStack, Button, useColorMode } from "@chakra-ui/react";
import { FaCalendarPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return <Container maxW={"1140px"} px={4}>
    <Flex 
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={{
        base:"column",
        sm:"row"
      }}
    >
      <Text
        fontSize={{base:"22", sm:"28"}}
        fontWeight='bold'
        textTransform={"uppercase"}
        textAlign={"center"}
        bgGradient={"linear(to-r, cyan.400, #FF0080)"}
        bgClip={"text"}
      >
        <Link to={"/"}>Tarefas do dia </Link>
      </Text>
      <HStack spacing={2} alignItems={"center"}>
        <Link to={"/create"}>
          <Button >
            <FaCalendarPlus fontSize={20} />
          </Button>
        </Link>
        <Link to={"/create"}>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon fontSize={20} /> : <SunIcon fontSize={20} />}
          </Button>
        </Link>
      </HStack>
    </Flex>
  </Container>
}

export default Navbar