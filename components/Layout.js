import io from 'socket.io-client'
import { Badge, Box, Divider, Flex, Heading, Spinner, Text } from '@chakra-ui/react';

const Container = ({ children }) => {
    return (
        <Flex h="100vh" bg='gray.300' align="center" justify="center" >
                {children}
        </Flex>
    )

}

const Header = ({ socket }) => {
    return (
        <>
        </>
    )
}

const Footer = () => {
    return (
        <>
        </>
    )
}

const Loading = () => {
    return <Flex h="100%" w="100%" align="center" justify="center" >
        <Spinner size="xl" speed="0.8s" thickness="4px" color="white" />
    </Flex>
}

const Layout = ({ children }) => {
    return (
        <>
            <Container>
                        <Header />
                            {children}
                        <Footer />
            </Container>
        </>
    );
}

export default Layout;
