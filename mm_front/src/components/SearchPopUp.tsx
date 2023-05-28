import "../styles/PopUps.css"

type SearchPopUpProps = {
    message: string
    title: string
}

const SearchPopUp = ({title, message} : SearchPopUpProps) => {
  return (
    <div className="error--container">
        <h1 className="error-title searching--title">{title}...</h1>
        <p className="error-message searching--title">{message}</p>
    </div>
  )
}

export default SearchPopUp