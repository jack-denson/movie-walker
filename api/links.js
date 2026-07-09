const { createClient } = require('redis');
const { getFilmOrPerson } = require('../helpers/tmdb');

async function getLinkData( req, res, cache ) {
    const { is_film } = req.query || true;
    const { to } = req.params;

    try {
        const result = await getFilmOrPerson( is_film, to, cache );
        return res.json( result );
    } catch( e ) {
        console.log( e )
        return res.json({})
    }

}

module.exports = {
    route: async ( app, middleware ) => {
        const redisClient = createClient({
            url: process.env.REDIS_CONN_STR
        });
        await redisClient.connect();
        app.get( '/link/:to', ...middleware, async ( req, res ) => getLinkData( req, res, redisClient ) );
    }
}
