import Navbar from "./components/Navbar"
import Main from "./components/Main"
import Landing from "./components/Landing"
import Instruction from "./components/Instruction"
import { BrowserRouter, Routes, Route } from "react-router-dom"

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
    </>
  )
}

export default App