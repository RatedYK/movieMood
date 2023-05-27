import "../styles/Main.css"

const Keywords = () => {
  return (
    <div className='keywords--container'>
            <h2 className='keywords--title'>Keywords</h2>
            <ul className='keywords--list'>
                <li><b>'action' 'comedy' 'adventure' 'animation</b> <i>etc. will search by genre</i></li>
                <li><b>'japanese' 'spanish' 'french'</b> <i>etc. will search by language</i></li>
                <li><b>'starring'</b> <i>will search by actors e.g. "starring tom cruise"</i></li>
                <li><b>'directed by'</b> <i>will search by directors e.g. "directed by quentin tarantino"</i></li>
                <li><b>'minutes'</b> <i>will search by runtime e.g. "140 minutes"</i></li>
                <li><b>'1980'</b> <i>will search for movies around the year 1980</i></li>
                <li><b>'PG' 'R' 'X' 'PG-13'</b> <i>etc. will search by their rating</i></li>
                <br></br>
                <li>Combinations of these keywords also work!</li>
                <li>e.g. <b>"japanese animation directed by hayao miyazaki starring takuya kimura"</b></li>
            </ul>
    </div>
  )
}

export default Keywords