const express    = require('express');
const dotenv     = require('dotenv');
const cors       = require('cors')
const links      = require('./links');
const challenges = require('./challenges');
const { connect: dbConnect }  = require('./dbConnect');

const port = 4000;

async function run() {
    const app = express();

    const challengeCollection = await dbConnect('challenges');
    const allChallenges = await challengeCollection.find({}).toArray();
    console.log( allChallenges );

    const todaysChallenge = await challengeCollection.find({ date: new Date(new Date().setHours(0,0,0,0))}).toArray();
    console.log(todaysChallenge)

    app.use( express.json() );
    app.use( express.urlencoded({ extended: true }) );
    const cors_policy = cors({origin: 'http://localhost:3000' });

    await links.route( app, [ cors_policy ] );
    await challenges.route( app, [ cors_policy ], challengeCollection );

    
    if( process.env.NODE_ENV === 'production') {
        app.use( express.static(__dirname + '/dist/') );
        app.get('/', (req, res) => {
            res.setHeader('content-type', 'text/html');
            res.sendFile(__dirname + '/dist/index.html')
        });
    }

    app.listen( port, () => {
        console.log(`Listening on port ${ port }`);
    });
}

dotenv.config();
run();