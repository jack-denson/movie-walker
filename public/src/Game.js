import React from 'react'
import './Game.css'
import Path from './Path.js';
import ChallengeIndicator from './ChallengeIndicator';
import MovieNodeView from './MovieNodeView';
import { Divider } from '@mui/material';

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      challenge: [
        {
            "poster_path": "/xi8Iu6qyTfyZVDVy60raIOYJJmk.jpg",
            "title": "Reservoir Dogs",
            "release": "1992",
            "tmdb_id": 500,
            "is_film": true
        },
        {
            "name": "Frances McDormand",
            "tmdb_id": 3910,
            "profile_path": "/r0A7hZsM1zuavTr0jN7bwmBcliR.jpg",
            "is_film": false
        }
      ],
      foundPath: [
        {
            "poster_path": "/xi8Iu6qyTfyZVDVy60raIOYJJmk.jpg",
            "title": "Reservoir Dogs",
            "release": "1992",
            "tmdb_id": 500,
            "is_film": true
        },
        {
            "name": "Quentin Tarantino",
            "tmdb_id": 138,
            "profile_path": "/1gjcpAa99FAOWGnrUvHEXXsRs7o.jpg",
            "is_film": false
        },
        {
            "poster_path": "/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg",
            "title": "Inglourious Basterds",
            "release": "2009",
            "tmdb_id": 16869,
            "is_film": true
        },
        {
            "name": "Brad Pitt",
            "tmdb_id": 287,
            "profile_path": "/oTB9vGIBacH5aQNS0pUM74QSWuf.jpg",
            "is_film": false
        },
        {
            "poster_path": "/jdwSkQu3XirmX18MNj8CqFWsCk.jpg",
            "title": "Burn After Reading",
            "release": "2008",
            "tmdb_id": 4944,
            "is_film": true
        },
      ]
    };
  }

  render() {
    return (
        <div>
            <ChallengeIndicator challenge={ this.state.challenge }></ChallengeIndicator>
            <Divider />
            <Path foundPath={ this.state.foundPath }></Path>
            <Divider />
            <MovieNodeView current={ this.state.foundPath[ this.state.foundPath.length - 1 ] }></MovieNodeView>
        </div>
    );

  }
}
export default Game;
