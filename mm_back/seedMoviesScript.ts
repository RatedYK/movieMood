require('dotenv').config({path: './.env'});
const Knex = require("knex");
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const axios = require('axios');

// const allGenres: string[] = ['action']

const givenGenres: string[] = ['action', 'adventure', 'animation', 'comedy', 'war'];
const givenGenres2: string[] = ['drama', 'family', 'fantasy', 'horror', 'crime'];
const givenGenres3: string[] = ['mystery', 'romance', 'sci-fi', 'thriller', 'musical'];
const givenGenres4: string[] = ['sport', 'western', 'biography', 'history', 'documentary']

const options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/title/v2/get-popular-movies-by-genre',
  params: {
    genre: '',
    limit: '199'
  },
  headers: {
    'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
};

async function getImdbTitles(genres: string[]) {
    const allIds: string[] = [];
    await Promise.all(
        genres.map(async genre => {
            options.params.genre = genre;
            const response = await axios.request(options);
            const imdbIds = response.data.map((movie: any) => {
                const splitData = movie.split('/');
                const imdbId = splitData[2];
                return imdbId;
            });
        allIds.push(...imdbIds);
        await new Promise(resolve => setTimeout(resolve, 10000));
        })
    );
    return allIds;
}

async function getOmdbData(genres: string[], apikey: string | undefined) {
    const allImdbIds = await getImdbTitles(genres);
    const allMovies = await Promise.all(
        allImdbIds.map(async imdbId => {
            const response = await axios.get(`http://www.omdbapi.com/?i=${imdbId}&apikey=${apikey}`);
            return response.data;
    }));
    return allMovies;
}


async function seedMovies(genres: string[], apikey: string | undefined) {
    const allMoviesUnfilted = await getOmdbData(genres, apikey);
    const allMovies = allMoviesUnfilted.filter((movie: any) => {
      return movie.Title !== null && movie.Title !== undefined;
    });
  
    try {
      await knex.transaction(async (trx: any) => {
        for (const movie of allMovies) {
          try {
            const existingMovie = await trx('movies')
              .select('id')
              .where('title', movie.Title)
              .first();
            if (!existingMovie) {
              const [movieId] = await trx('movies')
                .insert({
                  title: movie.Title,
                  plot: movie.Plot,
                  year: movie.Year,
                  runtime: movie.Runtime,
                  actors: movie.Actors,
                  director: movie.Director,
                  poster_img: movie.Poster,
                  country: movie.Country,
                  language: movie.Language,
                  imdb_rating: movie.imdbRating,
                  imdb_id: movie.imdbID,
                  rated: movie.Rated,
                  genres: movie.Genre,
                })
                .returning('id');
              // Insert genres, break apart string of genres
              for (const genreName of movie.Genre.split(', ')) {
                const [genre] = await trx('genres')
                  .select('id')
                  .where('genre', genreName);
                let genreId;
                if (!genre) {
                  const [newGenreId] = await trx('genres')
                    .insert({ genre: genreName })
                    .returning('id');
                  genreId = newGenreId;
                } else {
                  genreId = genre;
                }
                console.log(
                  'inserting genreId:',
                  genreId.id,
                  'and movieId:',
                  movieId.id
                );
                // Associate movie with genre
                await trx('movies_genres').insert({
                  movie_id: movieId.id,
                  genre_id: genreId.id,
                });
              }
            } else {
              console.log(`Movie skipped: ${movie.Title} already exists`);
            }
          } catch (error) {
            console.log(`Error seeding movie: ${movie.Title}`);
            console.log('Failed Movie Data:', {
              title: movie.Title,
              plot: movie.Plot,
              year: movie.Year,
              runtime: movie.Runtime,
              actors: movie.Actors,
              director: movie.Director,
              poster_img: movie.Poster,
              country: movie.Country,
              language: movie.Language,
              imdb_rating: movie.imdbRating,
              imdb_id: movie.imdbID,
              rated: movie.Rated,
            });
            throw error; // re-throw the error to stop the transaction
          }
        }
      });
      console.log('Movies seeded');
    } catch (error) {
      console.log(`Error seeding movies: ${error}`);
    }
  }
  

  // Call the seedMovies function for each genre
  (async () => {
    try {
      await seedMovies(givenGenres, process.env.OMDB_API_KEY);
      setTimeout(async () => {
        await seedMovies(givenGenres2, process.env.OMDB_API_KEY1);
      }, 25000);
      setTimeout(async () => {
        await seedMovies(givenGenres3, process.env.OMDB_API_KEY2);
      }, 50000);
      setTimeout(async () => {
      await seedMovies(givenGenres4, process.env.OMDB_API_KEY3);
      knex.destroy(); // Close the connection after all genres are seeded
      }, 75000);
    } catch (error) {
      console.log(`Error: ${error}`);
      knex.destroy(); // Close the connection in case of an error
    }
  })();