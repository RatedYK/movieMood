import "../styles/Instruction.css"

const Instruction = () => {
  return (
    <main className='instruction--container'>
        <h1 className='instruction--title'>How To Use</h1>
        <div className='instruction--info-container'>
            <ul className="instruction--list">
                <li>Click on the <b>Get Started</b> button to start</li>
                <li>Type in the white box the kind of movie you would like to watch.</li>
                <li>E.g. comedy starring adam sandler</li>
                <li>*HINT* Use the <b>keywords</b> to get better results</li>
                <li>Hit "Enter" and see your search results.</li>
                <li>It's <i>that</i> simple!</li>
            </ul>
            <a href="/main" className="landing--btn start">Get Started</a>
        </div>
    </main>
  )
}

export default Instruction