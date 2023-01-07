const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

const database_name = 'MovieWalker'

dotenv.config();

const uri = process.env.DB_CONN_STR;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});


async function connect( coll ) {
  await client.connect();
  const database = client.db( database_name );
  const collection = database.collection( coll );

  return collection;
}


module.exports = { connect, close: client.close.bind( client ) }