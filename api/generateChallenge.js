const axios = require('axios');
const dotenv = require('dotenv');
const { getFilmOrPerson } = require('./links');
const { createClient } = require('redis');
const { connect: dbConnect, close: dbClose } = require('./dbConnect');

const MAX_SEARCHES = 2500;

async function randomPopularMovie() {
    const movie_page = Math.ceil( Math.random() * 50 )
    const uri = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&page=${ movie_page }&api_key=${process.env.TMDB_API_KEY}`

    const { data: res } = await axios.get( uri );

    const movie = res.results[ Math.floor( Math.random() * res.results.length ) ]

    return movie;
}


async function verifyReachability( from, to, cache ) {


    const expandedPeople = new Set();
    const expandedMovies = new Set();

    let moviesToExpand = [ from ];

    while( expandedPeople.size + expandedMovies.size < MAX_SEARCHES ) {

        let toExpand = moviesToExpand.shift();
        while( !toExpand ) {
            toExpand = moviesToExpand.shift();
        }

        const nextPeople = await expandMovie( toExpand, cache );
        expandedMovies.add( toExpand );
        
        for( person of nextPeople ) {
            if( person && !expandedPeople.has( person ) ) {
                expandedPeople.add( person )
    
                const thisPersonsFilms = await expandPerson( person, cache );
    
                if( thisPersonsFilms.includes( to ) ) {
                    return true
                }
    
                moviesToExpand = [ ...moviesToExpand, thisPersonsFilms.filter( film => !expandedMovies.has( film ) ) ].flat();
            }
        }
    }


    return false;
    
}


async function expandMovie( id, cache ) {
    if( id ) {
        const { credits } = await getFilmOrPerson( true, id, cache);

        return [
            ...credits.cast.map( credit => credit.tmdb_id ),
            ...credits.crew.filter( credit => credit.job === 'Director' ).map( credit => credit.tmdb_id )
        ]
    }
    return [];

}


async function expandPerson( id, cache ) {
    if( id ) {
        const { movie_credits } = await getFilmOrPerson( false, id, cache );

        return [ 
            ...movie_credits.cast.filter( credit => credit.vote_count > 3000 ).map( credit => credit.tmdb_id ),
            ...movie_credits.crew.filter( credit => credit.vote_count > 3000 && credit.job === 'Director' ).map( credit => credit.tmdb_id )
        ]
    }
    return [];
}



async function generate( toGen ) {

    const cache = createClient();
    await cache.connect();

    const challenges = await dbConnect('challenges');

    let numMatches = 0;

    const [ maxDate ] = await challenges.find({}).sort({ date: -1 }).limit( 1 ).toArray();

    let dateToSet = maxDate.date.getTime() + 24 * 60 * 60 * 1000;

    while( numMatches < toGen ) {
        const movieA = await randomPopularMovie();
        const movieB = await randomPopularMovie();

        console.log('---------------------TRYING---------------------')
        console.log( movieA );
        console.log( movieB );
        const goodMatch = await verifyReachability( movieA.id, movieB.id, cache );

        if( goodMatch ) {

            const fromMovie = await getFilmOrPerson( true, movieA.id, cache )
            const toMovie = await getFilmOrPerson( true, movieB.id, cache )
            console.log('------------------ADDING---------------------')

            console.log( fromMovie)
            console.log( toMovie );
            await challenges.insertOne({
                from: fromMovie,
                to: toMovie,
                date: new Date( dateToSet )
            });
            dateToSet = new Date( dateToSet + 60 * 60 * 24 * 1000 );

            numMatches++;
        } else {
            console.log("---------------------COULD NOT ADD---------------------")
        }
    
    }

    await dbClose();
    
}

dotenv.config();
generate( 5 );