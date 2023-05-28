import Navbar from "./components/Navbar"
import Main from "./components/Main"
import Landing from "./components/Landing"
import Instruction from "./components/Instruction"
import Footer from "./components/Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { pingServer } from "../scripts/pingServer"

// Schedule the subsequent pings every 10 minutes (600,000 milliseconds)
setInterval(pingServer, 600000);

const App = () => {

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