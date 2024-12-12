import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, VStack, IconButton, useColorModeValue, Text, Input, Image, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";


const CartaoAtividade = ({product})=>{
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const toast = useToast();
    const {deleteProduct, updateProduct} = useProductStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDeleteProduct = async(pid)=>{
        const {success, message} = await deleteProduct(pid);
        if(!success){
            toast({
                title:"Erro!",
                description: message,
                status: 'error',
                duration: 6000,
                isClosable: true,
            });
            }else{
                toast({
                    title:"Sucesso!",
                    description: message,
                    status: 'success',
                    duration: 6000,
                    isClosable: true,
            });
        }
    };

    const handleUpdateProduct = async (pid, updatedProduct)=>{
        const {success,message} = await updateProduct(pid, updatedProduct);
        onClose();
        if(!success){
            toast({
                title:"Erro!",
                description: message,
                status: "error",
                duration: 6000,
                isClosable: true,
            })
        }else{
            toast({
                title:"Sucesso!",
                description: message,
                status: "Produto atualizado com sucesso.",
                duration: 6000,
                isClosable: true,
            }) 
        }
    };

    return <Box 
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    bg={bg}
    >
        <Image src={product.image} alt={product.name} h={8} w='full' objectFit='cover'/>
        <Box p={4}>
            <Heading as ='h3' size={"md"} mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight='bold' fontSize='xl'color={textColor} mb={4}>
                ${product.price}
            </Text>
            <HStack spacing={2}>
                <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme='blue'/>
                <IconButton icon={<DeleteIcon/>} onClick={()=> handleDeleteProduct(product._id)} colorScheme='red'/>
            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent >
                <ModalHeader>Editar atividade</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <VStack spacing={4}>
                        <Input placeholder='Tarefa/Evento' name='name' 
                        value={updatedProduct.name} onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>
                        <Input placeholder='Horário' name='price' type='number'
                        value={updatedProduct.price} onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.price})}/>
                        <Input placeholder='Imagem' name='image' 
                        value={updatedProduct.image} onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.image})}/>
                </VStack>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="green" mr={3} onClick={()=> handleUpdateProduct(product._id, updatedProduct)}>
                    Atualizar
                </Button>
                <Button colorScheme="ghost" onClick={onClose}>
                    Cancelar
                </Button>
            </ModalFooter>
            </ModalContent>


        </Modal>
    </Box>
};

export default CartaoAtividade;