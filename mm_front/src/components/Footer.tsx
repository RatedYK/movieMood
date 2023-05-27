import "../styles/Footer.css"

type FooterProps = {
    name: string
}

const Footer = ({name} : FooterProps) => {
  return (
    <footer>Copyright©{name}</footer>
  )
}

export default Footer