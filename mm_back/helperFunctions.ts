require('dotenv').config({path: './.env'});
const Knex = require("knex");
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

export async function getByGenre(genre : string[]) {
    try {
        const reformedGenres = genre.map((genre : string) => {
            return genre[0].toUpperCase() + genre.slice(1);
        });
        const allMoviesFitGenre: object[] = [];
        await Promise.all(reformedGenres.map(async eachGenre => {
            const movies = await knex('movies_genres')
                            .select('*')
                            .join('movies', 'movies_genres.movie_id', '=', 'movies.id')
                            .join('genres', 'movies_genres.genre_id', '=', 'genres.id')
                            .where('genres.genre', eachGenre);
            allMoviesFitGenre.push(...movies);
        }));
        return allMoviesFitGenre;
    } catch (error) {
        console.error(error);
    }
}

async function getByActor(actor : string) {
    try {
        const reformedActor = actor.split(' ').map((word : string) => {
            return word[0].toUpperCase() + word.slice(1);
        }).join(' ');
        console.log(reformedActor)
        const movies = await knex('movies')
                            .select('*')
                            .where('actors', 'like', `%${reformedActor}%`);
        return movies;
    } catch (error) {
        console.error(error);
    }
}

async function getByDirector(director : string) {
    try {
        const reformedDirector = director.split(' ').map((word : string) => {
            return word[0].toUpperCase() + word.slice(1);
        }).join(' ');
        const movies = await knex('movies')
                            .select('*')
                            .where('director', 'like', `%${reformedDirector}%`);
        return movies;
    } catch (error) {
        console.error(error);
    }
}

async function getByLanguage(language : string) {
    try {
        const reformedLanguage = language.charAt(0).toUpperCase() + language.slice(1);
        const movies = await knex('movies')
                            .select('*')
                            .where('language', 'like', `%${reformedLanguage}`);
        return movies;
    } catch (error) {
        console.error(error);
    }
}

async function getByRuntime(runtime : string) {
    try {
        const movies = await knex('movies')
                            .select('*');
        const inputRuntime = parseInt(runtime);
        const filteredMovies = movies.filter((movie : any) => {
            const runtimeInt = parseInt(movie.runtime);
            if (isNaN(runtimeInt)) return false;
            return runtimeInt - 25 <= inputRuntime && inputRuntime <= runtimeInt + 30;
        });
        return filteredMovies;
    } catch (error) {
        console.error(error);
    }
}

async function getByYear(year : string) {
    try {
        const movies = await knex('movies')
                            .select('*');
        const inputYear = parseInt(year);
        const filteredMovies = movies.filter((movie : any) => {
            const yearInt = parseInt(movie.year);
            if (isNaN(yearInt)) return false;
            return yearInt - 10 <= inputYear && inputYear <= yearInt + 10;
        });
        return filteredMovies;
    } catch (error) {
        console.error(error);
    }
}

async function getByRating(rating : string) {
    try {
        const reformedRating = rating.toUpperCase();
        const movies = await knex('movies')
                            .select('*')
                            .where('rated', reformedRating);
        return movies;
    } catch (error) {
        console.error(error);
    }
}
  

// FILTER FUNCTIONS
async function filterByGenre(movies: any, genre : string[]) {
    const reformedGenres = genre.map((genre : string) => {
        return genre[0].toUpperCase() + genre.slice(1);
    });
    return movies.filter((movie : any) => {
        return reformedGenres.includes(movie.genre);
    });
    
}
async function filterByDirector(movies : any, director:string) {
    return movies.filter((movie : any) => {
        return movie.director.toLowerCase().includes(director);
    });
}

async function filterByLanguage(movies : any, language:string) {
    return movies.filter((movie : any) => {
        return movie.language.toLowerCase().includes(language);
    });
}

async function filterByActor(movies : any, actor:string) {
    return movies.filter((movie : any) => {
        return movie.actors.toLowerCase().includes(actor);
    });
}

async function filterByRuntime(movies : any, runtime:string) {
    const inputRuntime = parseInt(runtime);
    return movies.filter((movie : any) => {
        const runtimeInt = parseInt(movie.runtime);
        if (isNaN(runtimeInt)) return false;
        return runtimeInt - 25 <= inputRuntime && inputRuntime <= runtimeInt + 30;
    });
}

async function filterByYear(movies : any, year:string) {
    const inputYear = parseInt(year);
    return movies.filter((movie : any) => {
        const yearInt = parseInt(movie.year);
        if (isNaN(yearInt)) return false;
        return yearInt - 10 <= inputYear && inputYear <= yearInt + 10;
    });
}

async function filterByRated(movies : any, rated:string) {
    const reformedRating = rated.toUpperCase();
    return movies.filter((movie : any) => {
        return movie.rated === reformedRating;
    });
}









// THE MAIN MOVIE GETTER

type reqObj = {
    year?: string,
    rated?: string,
    runtime?: string,
    genre?: string[] | undefined,
    director?: string,
    actor?: string,
    language?: string,
}

export async function getMovie(reqObj : reqObj) {
    const { year, 
        rated, 
        runtime, 
        genre, 
        director, 
        actor, 
        language,} = reqObj;
    
    try {
        let returnMovies
        
        // LANGUAGE ROUTE
        if (language) {
            returnMovies = await getByLanguage(language);
            if (genre) {
                // get by genre and then seperate
                returnMovies = await getByGenre(genre);
                returnMovies = await filterByLanguage(returnMovies, language);
            }
            if (director) {
                returnMovies = await filterByDirector(returnMovies, director);
            }
            if (actor) {
                returnMovies = await filterByActor(returnMovies, actor);
            }
            if (runtime) {
                returnMovies = await filterByRuntime(returnMovies, runtime);
            }
            if (year) {
                returnMovies = await filterByYear(returnMovies, year);
            }
            if (rated) {
                returnMovies = await filterByRated(returnMovies, rated);
            }
            checkResults(returnMovies);
            return returnMovies;
        }
        
        // GENRE ROUTE
        if (genre) {
            returnMovies = await getByGenre(genre);
            if (director) {
                returnMovies = await filterByDirector(returnMovies, director);
            }
            if (actor) {
                returnMovies = await filterByActor(returnMovies, actor);
            }
            if (runtime) {
                returnMovies = await filterByRuntime(returnMovies, runtime);
            }
            if (year) {
                returnMovies = await filterByYear(returnMovies, year);
            }
            if (rated) {
                returnMovies = await filterByRated(returnMovies, rated);
            }
            checkResults(returnMovies);
            return returnMovies;
        }
        // ACTOR ROUTE
        if (actor) {
            returnMovies = await getByActor(actor);
            if (director) {
                returnMovies = await filterByDirector(returnMovies, director);
            }
            if (runtime) {
                returnMovies = await filterByRuntime(returnMovies, runtime);
            }
            if (year) {
                returnMovies = await filterByYear(returnMovies, year);
            }
            if (rated) {
                returnMovies = await filterByRated(returnMovies, rated);
            }
            checkResults(returnMovies);
            return returnMovies;
        }
    
        // DIRECTOR ROUTE
    
        if (director) {
            returnMovies = await getByDirector(director);
            if (runtime) {
                returnMovies = await filterByRuntime(returnMovies, runtime);
            }
            if (year) {
                returnMovies = await filterByYear(returnMovies, year);
            }
            if (rated) {
                returnMovies = await filterByRated(returnMovies, rated);
            }
            checkResults(returnMovies);
            return returnMovies;
        }
    
        // RUNTIME ROUTE
        if (runtime) {
            returnMovies = await getByRuntime(runtime);
            if (year) {
                returnMovies = await filterByYear(returnMovies, year);
            }
            if (rated) {
                returnMovies = await filterByRated(returnMovies, rated);
            }
            checkResults(returnMovies);
            return returnMovies;
        }
    
        // YEAR ROUTE
        if (year) {
            returnMovies = await getByYear(year);
            if (rated) {
                returnMovies = await filterByRated(returnMovies, rated);
            }
            checkResults(returnMovies);
            return returnMovies;
        }
    
        if (rated) {
            returnMovies = await getByRating(rated);
            checkResults(returnMovies);
            return returnMovies;
        }
    
        throw new Error('No movies found');

    } catch (error) {
        console.error(error);
    }
}

// ERROR HANDLING

function checkResults(results : any) {
    if (results.length === 0) throw new Error('No movies found');
    return results;
}