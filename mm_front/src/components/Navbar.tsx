import "../styles/Navbar.css"
import HamburgerMenu from "./HamburgerMenu"
const logo = require("../assets/icons/logo.png")

const Navbar = () => {
  return (
    <nav className="nav--container">
      <img className="nav--logo" src={logo} alt="Movie Mood"/>
      <HamburgerMenu />
    </nav>
  )
}

export default Navbar