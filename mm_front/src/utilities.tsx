export function checkForGenre(prompt: string) {
    const allGenres = ['action', 'adventure', 'animation', 'comedy', 'crime', 'drama', 
    'family', 'fantasy', 'horror', 'musical', 'mystery', 'romance', 'sci-fi', 'thriller', 'war',
    'western', 'biography', 'history', 'documentary', 'sport'];


    const lowerCasePrompt = prompt.toLowerCase();
    const inputtedGenres = [];

    for (let i = 0; i < allGenres.length; i++) {
        if (lowerCasePrompt.includes(allGenres[i])) {
            inputtedGenres.push(allGenres[i]);
        }
    }

    if (inputtedGenres.length === 0) {
        return false;
    }

    return inputtedGenres;
}


export function checkForYear(prompt: string): string | boolean {
    const yearRegex = /\d{4}/;
    const match = prompt.match(yearRegex);
  
    if (match && match.length > 0) {
      return match[0];
    }
  
    return false;
  }
  

export function checkForActor(prompt: string) {
    if (prompt.toLowerCase().includes('starring')) {
        const promptArray = prompt.split(' ');
        const index = promptArray.indexOf('starring');
        // gets full name of actor
        return promptArray.slice(index + 1, index + 3).join(' ');
    }
    return false;
}

export function checkForDirector(prompt: string) {
    if (prompt.toLowerCase().includes('directed by')) {
        const promptArray = prompt.split(' ');
        const index = promptArray.indexOf('by');
        // gets full name of director
        return promptArray.slice(index + 1, index + 3).join(' ');
    }
    return false;
}

export function checkForRated(prompt: string) {
    const ratings = ['g', 'pg', 'pg-13', 'r', 'nc-17', 'x'];
    const promptArray = prompt.toLowerCase().split(' ');
    for (const rating of ratings) {
        if (promptArray.includes(rating)) {
            return rating;
        }
    }
    return false;
}

export function checkForRuntime(prompt: string) {
    const promptArray = prompt.split(' ');
    const index = promptArray.indexOf('minutes');
    if (index > 0) {
        return promptArray[index - 1];
    }
    return false;
}

export function checkForLanguage(prompt: string) {
    const movieLanguages = ['english', 'japanese', 'korean', 'chinese', 'french', 'spanish', 'indian', 'latin', 'italian',
                            'german', 'russian', 'arabic', 'portuguese', 'swedish', 'dutch', 'polish', 'turkish', 'hebrew',
                            'thai', 'greek', 'hungarian', 'czech', 'danish', 'finnish', 'norwegian', 'romanian', 'slovak',
                            'cantonese', 'persian', 'vietnamese', 'hindi'];
    const promptArray = prompt.toLowerCase().split(' ');
    for (const language of movieLanguages) {
        if (promptArray.includes(language)) {
            return language;
        }
    }
    return false;
}

export function filterPrompt(prompt: string) {
    const cleanPrompt = prompt.toLowerCase();
    const genre = checkForGenre(cleanPrompt);
    const year = checkForYear(cleanPrompt);
    const actor = checkForActor(cleanPrompt);
    const director = checkForDirector(cleanPrompt);
    const rated = checkForRated(cleanPrompt);
    const runtime = checkForRuntime(cleanPrompt);
    const language = checkForLanguage(cleanPrompt);

    return {
        genre: genre,
        year: year,
        actor: actor,
        director: director,
        rated: rated,
        runtime: runtime,
        language: language
    }
}