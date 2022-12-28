const express    = require('express');
const dotenv     = require('dotenv');
const cors       = require('cors')
const links      = require('./links');
const challenges = require('./challenges');

const port = 4000;

async function run() {
    const app = express();

    app.use( express.json() );
    app.use( express.urlencoded({ extended: true }) );
    const cors_policy = cors({origin: 'http://localhost:3000' })

    await links.route( app, [ cors_policy ] );
    await challenges.route( app, [ cors_policy ] );

    app.listen( port, () => {
        console.log(`Listening on port ${ port }`);
    });
}

dotenv.config();
run();