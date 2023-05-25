require('dotenv').config({path: './.env'});
const Knex = require("knex");
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const axios = require('axios');

const allGenres: string[] = ['action']

const allGenres123: string[] = ['action', 'adventure', 'animation', 'comedy', 'crime', 'drama', 'family',
'fantasy', 'horror', 'musical', 'mystery', 'romance', 'sci-fi', 'thriller', 'war', 'western'];

const options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/title/v2/get-popular-movies-by-genre',
  params: {
    genre: 'adventure',
    limit: '3'
  },
  headers: {
    'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
};

async function getImdbTitles() {
    const allIds: string[] = [];
    await Promise.all(
        allGenres.map(async genre => {
            options.params.genre = genre;
            const response = await axios.request(options);
            const imdbIds = response.data.map((movie: any) => {
                const splitData = movie.split('/');
                const imdbId = splitData[2];
                return imdbId;
            });
        allIds.push(...imdbIds);
        })
    );
    return allIds;
}

async function getOmdbData() {
    const allImdbIds = await getImdbTitles();
    const allMovies = await Promise.all(
        allImdbIds.map(async imdbId => {
            const response = await axios.get(`http://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${process.env.OMDB_API_KEY}`);
            return response.data;
    }));
    return allMovies;
}

async function seedMovies() {
    const allMovies = await getOmdbData();
    try {
        await knex.transaction(async (trx:any) => {
            for(const movie of allMovies) {
                const [movieId] = await trx('movies').insert({
                    title: movie.Title,
                    plot: movie.Plot,
                    year: movie.Year,
                    runtime: movie.Runtime,
                    actors: movie.Actors,
                    director: movie.Director,
                    poster_img: movie.Poster_img,
                    country: movie.Country,
                    imdb_rating: movie.imdbRating,
                    imdb_id: movie.imdbID,
                    rated: movie.Rated
                }).returning('id');
                // Insert genres, break apart string of genres
                for (const genreName of movie.Genre.split(', ')) {
                    const [genre] = await trx('genres').select('id').where('genre', genreName);
                    let genreId;
                    if (!genre) {
                        const [newGenreId] = await trx('genres').insert({genre: genreName}).returning('id');
                        genreId = newGenreId;
                    } else {
                        genreId = genre;
                    }
                    console.log('inserting genreId:', genreId.id, "and movieId:", movieId.id);
                    // Associate movie with genre
                    await trx('movies_genres').insert({movie_id: movieId.id, genre_id: genreId.id});
                }
            };
            console.log('Movies seeded')
        });
    } catch (error) {
        console.log(`Error seeding movies: ${error}`)
        // Rollback changes
        knex.destroy();
    } finally {
        knex.destroy();
    }
}

seedMovies();