import { useEffect } from "react"
import Navbar from "./components/Navbar"
import Main from "./components/Main"
import Landing from "./components/Landing"
import Instruction from "./components/Instruction"
import Footer from "./components/Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { pingServer } from "./scripts/pingServer"

const App = () => {

  // Ping the server on initial load
  useEffect(() => {
    pingServer();
    const pingInterval = setTimeout(pingServer, 600000);
    return () => clearTimeout(pingInterval);
  }, []);

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
          <Route path="/instruction" element={<Instruction />} />
        </Routes>
      </BrowserRouter>
      <Footer name={"MovieMood"}/>
    </>
  )
}

export default App