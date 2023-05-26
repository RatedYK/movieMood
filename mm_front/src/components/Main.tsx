import { useState } from 'react'
import { filterPrompt } from '../utilities'
import MovieCard from './MovieCard'



const Main = () => {
    const [userPrompt, setUserPrompt] = useState('')
    const [movieData, setMovieData] = useState<any>([])
    const [showMovieCards, setShowMovieCards] = useState<boolean>(false)



    // FUNCTIONS
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserPrompt(e.target.value)
    }

    function closeCards() {
        setShowMovieCards(false)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const body = filterPrompt(userPrompt);
        console.log(body)
        const response = await fetch('http://localhost:8000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        console.log(data)

        setMovieData(data);
        setShowMovieCards(true);
        setUserPrompt('')
    }



  return (
    <main>
        <h1>Movie Mood</h1>
        <p>What kind of movie would you like to watch?</p>
        <form onSubmit={handleSubmit}>
            <input className='user--prompt' type='text' onChange={handleChange} value={userPrompt} />
        </form>
        {showMovieCards && <MovieCard movieData={movieData} onClose={closeCards} />}
    </main>
  )
}

export default Main