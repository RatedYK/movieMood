import { slide as Menu } from 'react-burger-menu'
import "../styles/HamburgerMenu.css"


const HamburgerMenu = () => {

  return (
    <Menu right noOverlay>
        <a id="home" className="menu-item" href="/"><span className="material-symbols-outlined">home</span> Home</a>
        <a id="howToUse" className="menu-item" href="/instruction"><span className="material-symbols-outlined">help</span> How To Use</a>
        <a id="main" className="menu-item" href="/main"><span className="material-symbols-outlined">theaters</span> Let's Try!</a>
    </Menu>
  )
}

export default HamburgerMenu