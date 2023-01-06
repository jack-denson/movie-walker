
const fallback_challenge = [ // If we have not calculated one for the day. Should never have to use this
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
];

function formatChallenge( challengeDoc ) {
    return [
        challengeDoc.from,
        challengeDoc.to
    ];
}

async function getChallenge( req, res, challengesConnection ) {

    const challenge = await challengesConnection.findOne({
        date: new Date(new Date().setHours(0,0,0,0))
    });

    return res.json( challenge ? formatChallenge( challenge ) : fallback_challenge );
}

module.exports = {
    route: async ( app, middleware, dbConnection  ) => {
        app.get( '/challenge', ...middleware, async (req, res) => getChallenge( req, res, dbConnection ) );
    }
}