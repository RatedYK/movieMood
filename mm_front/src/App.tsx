import Navbar from "./components/Navbar"
import Main from "./components/Main"
import Landing from "./components/Landing"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App