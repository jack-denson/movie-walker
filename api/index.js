const express    = require('express');
const dotenv     = require('dotenv');
const links      = require('./links');
const challenges = require('./challenges');

const port = 4000;

async function run() {
    const app = express();

    app.use( express.json() );
    app.use( express.urlencoded({ extended: true }) );

    await links.route( app, [] );
    await challenges.route( app, [] );

    app.listen( port, () => {
        console.log(`Listening on port ${ port }`);
    });
}

dotenv.config();
run();