import { slide as Menu } from 'react-burger-menu'
import "../styles/HamburgerMenu.css"


const HamburgerMenu = () => {

  return (
    <Menu right noOverlay>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="howToUse" className="menu-item" href="/instruction">How To Use</a>
        <a id="main" className="menu-item" href="/main">Let's Try!</a>
    </Menu>
  )
}

export default HamburgerMenu