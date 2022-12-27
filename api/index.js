const express = require('express');
const dotenv  = require('dotenv');
const port = 4000;

async function run() {
    const app = express();

    app.use( express.json() );
    app.use( express.urlencoded({ extended: true }) );

    app.listen( port, () => {
        console.log(`Listening on port ${ port }`);
    });
}

dotenv.config();
run();