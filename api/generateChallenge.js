const axios = require('axios');
const dotenv = require('dotenv');
const { getPersonData, getFilmData } = require('./links');

async function randomPopularMovie() {
    const movie_page = Math.floor( Math.random() * 50 )
    const uri = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&page=${ movie_page }&api_key=${process.env.TMDB_API_KEY}`

    const { data: res } = await axios.get( uri );

    const movie = res.results[ Math.floor( Math.random() * res.results.length ) ]

    return movie;
}


async function verifyReachability( from, to ) {


    const expandedPeople = new Set();
    const expandedMovies = new Set();

    let moviesToExpand = [ from ];

    while( expandedPeople.size + expandedMovies.size < 400 ) {



        let toExpand = moviesToExpand.shift();
        while( !toExpand ) {
            toExpand = moviesToExpand.shift();
        }

        const nextPeople = await expandMovie( toExpand );
        expandedMovies.add( toExpand );
        
        for( person of nextPeople ) {
            if( person && !expandedPeople.has( person ) ) {
                expandedPeople.add( person )
    
                const thisPersonsFilms = await expandPerson( person );
    
                if( thisPersonsFilms.includes( to ) ) {
                    return true
                }
    
                moviesToExpand = [ ...moviesToExpand, thisPersonsFilms.filter( film => !expandedMovies.has( film ) ) ];
            }
        }
    }


    return false;
    
}


async function expandMovie( id ) {
    const { credits } = await getFilmData( id );

    return [
        ...credits.cast.map( credit => credit.tmdb_id ),
        ...credits.crew.filter( credit => credit.job === 'Director' ).map( credit => credit.tmdb_id )
    ]

}


async function expandPerson( id ) {
    const { movie_credits } = await getPersonData( id );

    return [ 
        ...movie_credits.cast.filter( credit => credit.vote_count > 3000 ).map( credit => credit.tmdb_id ),
        ...movie_credits.crew.filter( credit => credit.vote_count > 3000 && credit.job === 'Director' ).map( credit => credit.tmdb_id )
    ]
}


async function generate() {

    const movieA = await randomPopularMovie();
    const movieB = await randomPopularMovie();

    console.log( movieA );
    console.log( movieB )
    const foo = await verifyReachability( movieA.id, movieB.id );
    console.log( foo );
    
}

dotenv.config();
//randomPopularMovie();

generate();