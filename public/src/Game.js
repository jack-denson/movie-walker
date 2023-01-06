import React from 'react'
import axios from 'axios';
import './Game.css'
import Path from './Path.js';
import ChallengeIndicator from './ChallengeIndicator';
import MovieNodeView from './MovieNodeView';
import WinScreen from './WinScreen';
import { CircularProgress, Divider } from '@mui/material';


class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      challenge: [],
      foundPath: []
    };
  }

  async componentDidMount() {
    this.fetchChallenge();
  }

  async fetchChallenge() {
    const api_url = 'http://localhost:4000/challenge/';
    const { data: api_res } = await axios.get( api_url );
    this.setState({
      challenge: api_res,
      foundPath: [ api_res[ 0 ] ]
    });
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

  backtrackPath( toIndex ) {
    if( toIndex < this.state.foundPath.length ) {
      this.setState({
        ...this.state,
        foundPath: this.state.foundPath.slice( 0, toIndex + 1 )
      })
    }
  }

  replayGame() {
    this.setState({
      ...this.state,
      foundPath: [ this.state.challenge[ 0 ] ]
    });
  }

  render() {
    if( this.state.challenge.length ) {
      return (
        <div>
            <ChallengeIndicator challenge={ this.state.challenge }></ChallengeIndicator>
            <Divider style={{ background: 'white' }} />
            <Path
              foundPath={ this.state.foundPath }
              backtrack={ this.backtrackPath.bind( this ) }></Path>
            <Divider style={{ background: 'white' }} />
            <MovieNodeView
              current={ this.state.foundPath[ this.state.foundPath.length - 1 ] }
              takeLink={ this.takeLink.bind( this ) }
              key={ this.state.foundPath[ this.state.foundPath.length - 1 ].tmdb_id }>
            </MovieNodeView>
            <WinScreen
              path={this.state.foundPath}
              gameWon={ this.state.foundPath[ this.state.foundPath.length - 1].tmdb_id == this.state.challenge[ 1 ].tmdb_id }
              restartGame={ this.replayGame.bind( this ) }></WinScreen>
        </div>
      );
    } else {
      return <div className="loadingGame">
        <CircularProgress />
      </div>
    }

  }
}
export default Game;
