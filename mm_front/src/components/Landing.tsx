import "../styles/Landing.css"

const Landing = () => {
  return (
    <main className="landing--container">
        <article className="landing--info-container">
            <h1 className="landing--catch">Over thousands of movies,</h1>
            <h1 className="landing--catch-second">Let us help you find the perfect one.</h1>
            <p className="landing--extra">Finding a movie to watch can be a chore of itself, we simplify this process <br></br>
                by allowing you to search for movies based on your taste and feeling!
            </p>
        </article>
        <div className="landing--btn-container">
            <a href="/main" className="landing--btn start">Get Started</a>
            <button className="landing--btn info">How does it work?</button>
        </div>
    </main>
  )
}

export default Landing