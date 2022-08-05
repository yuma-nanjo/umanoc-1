import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Sidebar>
      <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Sidebar>
    </ChakraProvider>
  );
}

export default App;
