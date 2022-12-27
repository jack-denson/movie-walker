# Movie Walker

Better name to come(hopefully)

A movie knowledge game similar to the Wikipedia game, get from movie A to movie B, or actor A to actor B, using only movie credits and movies.

For example, connecting 'Jamie Foxx' to 'Frances McDormand' may have the solution:
'Jamie Foxx' -> 'Django Unchained' -> 'Quentin Tarantino' -> 'Inglorious Basterds' -> 'Brad Pitt' -> 'Burn After Reading' -> 'Frances McDormand'

The idea is a full-stack web app, using Node on the backend and React on the frontend. Movie data provided by TMDB(The Movie Database). Intend to use Redis for a short-term cache to prevent overloading the TMDB API and hitting rate limits.

Backend is entirely in `/api`, and requires a file at `/api/.env` containing a `TMDB_API_KEY` environment variable.

Frontend(yet to come) entirely in `/public`.