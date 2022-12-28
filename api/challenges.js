async function getChallenge( req, res ) {

    //TODO: this changes daily

    const challenge = [
        {
            "poster_path": "/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg",
            "title": "Once Upon a Time… in Hollywood",
            "release": "2019",
            "tmdb_id": 466272,
            "is_film": true
        },
        {
            "name": "Frances McDormand",
            "tmdb_id": 3910,
            "profile_path": "/r0A7hZsM1zuavTr0jN7bwmBcliR.jpg",
            "is_film": false
        }
    ]

    return res.json( challenge )
}

module.exports = {
    route: async ( app, middleware ) => {
        app.get( '/challenge', ...middleware, getChallenge );
    }
}