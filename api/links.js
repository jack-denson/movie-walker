const axios = require('axios');

const crewToInclude = [ 'Director', 'Executive Producer', 'Producer' ];

async function getLinkData( req, res ) {
    const { is_film } = req.query || true;
    const { to } = req.params;

    // TODO: Check cache first(redis?)

    if( is_film ) {
        const film_data = await getFilmData( to )
        return res.json( film_data )
    } else {
        const person_data = await getPersonData( to )

        return res.json( person_data )
    }

}

async function getFilmData( film_id ) {
    const tmdb_url = `https://api.themoviedb.org/3/movie/${ film_id }?api_key=${ process.env.TMDB_API_KEY }&append_to_response=credits`

    const tmdb_response = await axios.get( tmdb_url, { 
        headers: { "Accept-Encoding": "application/json" } 
    });
    const film_data = tmdb_response.data;
    const { poster_path, original_title, release_date, credits, id } = film_data;

    credits.cast = credits.cast.map( castMember => {
        return {
            name: castMember.name,
            role: castMember.character,
            profile_path: castMember.profile_path,
            tmdb_id: castMember.id
        }
    });
    credits.crew = credits.crew.filter(
        crewMember => crewToInclude.includes( crewMember.job )
    ).map( crewMember => {
        return {
            name: crewMember.name,
            tmdb_id: crewMember.id,
            profile_path: crewMember.profile_path,
            job: crewMember.job
        }
    });

    return {
        poster_path,
        title: original_title,
        release: release_date.substr( 0, 4 ),
        tmdb_id: id,
        credits,
        is_film: true
    }
}

async function getPersonData( person_id ) {
    const tmdb_url = `https://api.themoviedb.org/3/person/${ person_id }?api_key=${ process.env.TMDB_API_KEY }&append_to_response=movie_credits`;

    const tmdb_response = await axios.get( tmdb_url, { 
        headers: { "Accept-Encoding": "application/json" } 
    });
    const person_data = tmdb_response.data;
    const { name, id, movie_credits, profile_path } = person_data;

    movie_credits.cast = movie_credits.cast.map( movie => {
        return {
            role: movie.character,
            tmdb_id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release: movie.release_date.substr( 0, 4 )
        }
    });
    movie_credits.crew = movie_credits.crew.filter(
        movie => crewToInclude.includes( movie.job )
    ).map( movie => {
        return {
            job: movie.job,
            tmdb_id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release: movie.release_date.substr( 0, 4 )
        }
    });

    return {
        name,
        tmdb_id: id,
        profile_path,
        movie_credits,
        is_film: false
    }



}

module.exports = {
    route: async ( app, middleware ) => {
        app.get( '/link/:to', ...middleware, getLinkData );
    },
    getPersonData,
    getFilmData
}