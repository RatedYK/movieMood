import { slide as Menu } from 'react-burger-menu'
import "../styles/HamburgerMenu.css"


const HamburgerMenu = () => {

  return (
    <Menu right noOverlay>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
    </Menu>
  )
}

export default HamburgerMenu