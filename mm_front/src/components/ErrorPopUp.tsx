import { useEffect } from "react"
import "../styles/ErrorPopUp.css"

type ErrorPopUpProps = {
    message: string
    title: string
    toggleError: () => void
}

const ErrorPopUp = ({message, title, toggleError} : ErrorPopUpProps) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            toggleError()
        }, 2000)
        return () => {
            clearTimeout(timeout)
        }
    })
  return (
    <div className="error--container">
        <h1 className="error-title">{title}</h1>
        <p className="error-message">{message}</p>
    </div>
  )
}

export default ErrorPopUp