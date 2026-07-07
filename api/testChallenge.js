const dotenv     = require('dotenv');
const { connect: dbConnect }  = require('./dbConnect');


async function getChallenge( req, res, challengesConnection ) {
    // const challengeCollection = await dbConnect('challenges');

    // const challenge = await challengeCollection.find({
    //     date: new Date().setHours(0,0,0,0)
    // }).toArray();
    
    // console.log( challenge )
}


dotenv.config();
getChallenge();