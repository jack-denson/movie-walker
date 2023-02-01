# Movie Walker

Better name to come(hopefully)

Deployed on [moviewalker.app](https://moviewalker.app) with Render.

A movie knowledge game similar to the Wikipedia game, get from movie A to movie B, or actor A to actor B, using only movie credits and movies.

For example, connecting 'Jamie Foxx' to 'Frances McDormand' may have the solution:
'Jamie Foxx' -> 'Django Unchained' -> 'Quentin Tarantino' -> 'Inglorious Basterds' -> 'Brad Pitt' -> 'Burn After Reading' -> 'Frances McDormand'

The idea is a full-stack web app, using Node on the backend and React on the frontend. Movie data provided by TMDB(The Movie Database). Intend to use Redis for a short-term cache to prevent overloading the TMDB API and hitting rate limits.

### Folder Structure

Backend is entirely in `/api`, and requires a file at `/api/.env`.

Frontend entirely in `/public`, build target is in `/api/dist`.

### Running the app

To run the app, `cd` into `api` and run `node index.js`.

Required environment variables:

- `TMDB_API_KEY`, valid API key for TMDB(The Movie Database)
- `DB_CONN_STR`, connection string to a running mongodb database
- `REDIS_CONN_STR`, connection string to a running redis cache

To populate the database with challenges, run `node generateChallenge.js` from `/api`. This will add 5 new challenges to the database, guaranteeing that they are all solvable. The dates on these challenges will start from the day after the most recent challenge in the database.

### Backend Setup

The MongoDB database has a single collection, `challenges` and stores all challenges for the application. It stores two films or people in fields `to` and `from`, and a date the challenge is/was scheduled for in `date`.

## TODOs

### Necessary

- [x] Update share button once deployed so that it works, with a link to the app
- [x] Make backend resilient to bad requests(currently app crashes if request doesn't look as expected)
- [x] Make Favicon
- [ ] App logo and better name
- [ ] Design updates on frontend, make it prettier
- [ ] Design updates on frontend, potentially only show first 5-10 actors/films, with 'expand' button to reduce image load
- [x] TTL in Redis
- [x] Deploy app & set up CI/CD out of git 
- [ ] Possibly generate challenges that start/end on actors, as opposed to always film -> film

### Nice-to-have/Redesigns

- [ ] All streak data/solutions is done on frontend and not stored on backend, paths are not verified(feature or bug?)
