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
        // {
        //     "poster_path": "/jdwSkQu3XirmX18MNj8CqFWsCk.jpg",
        //     "title": "Burn After Reading",
        //     "release": "2008",
        //     "tmdb_id": 4944,
        //     "is_film": true
        // },
      ]
    };
  }

  takeLink( nextNode ) {
    const {
      release,
      title,
      tmdb_id,
      poster_path,
      name,
      profile_path
    } = nextNode;

    if( !this.state.foundPath[ this.state.foundPath.length - 1 ].is_film ) {
      this.takeFilmLink({
        release,
        title,
        tmdb_id,
        poster_path,
      });
    } else {
      this.takePersonLink({
        release,
        name,
        tmdb_id,
        profile_path,
      });
    }
  }

  takeFilmLink( filmToGoto ) { 
    this.setState({
      ...this.state,
      foundPath: [ ...this.state.foundPath, {
        ...filmToGoto,
        is_film: true
      } ]
    });
  }
  
  takePersonLink( personToGoto ) { 
    this.setState({
      ...this.state,
      foundPath: [ ...this.state.foundPath, {
        ...personToGoto,
        is_film: false
      } ]
    });
  }
  render() {
    return (
        <div>
            <ChallengeIndicator challenge={ this.state.challenge }></ChallengeIndicator>
            <Divider style={{ background: 'white' }} />
            <Path foundPath={ this.state.foundPath }></Path>
            <Divider style={{ background: 'white' }} />
            <MovieNodeView
              current={ this.state.foundPath[ this.state.foundPath.length - 1 ] }
              takeLink={ this.takeLink.bind( this ) }
              key={ this.state.foundPath[ this.state.foundPath.length - 1 ].tmdb_id }>
            </MovieNodeView>
        </div>
    );

  }
}
export default Game;
