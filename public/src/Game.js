import React from 'react'
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
      foundPath: [],
      streak: localStorage.getItem('streak')
    };
  }

  async componentDidMount() {
    this.fetchChallenge();
  }

  async fetchChallenge() {
    const tzOffset = new Date().getTimezoneOffset();
    const api_url = `/challenge?tz=${ tzOffset }`;
    const api_res = await fetch( api_url );
    const challenge = await api_res.json();

    this.setState({
      challenge,
      foundPath: ( this.currentPathIsTodays() && JSON.parse( localStorage.getItem('currentPath') ) ) || [ challenge[ 0 ] ]
    }, this.updateCurrentPath);
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

    if(!this.currentPathIsTodays()) {
      this.fetchChallenge();
    } else if( !this.state.foundPath[ this.state.foundPath.length - 1 ].is_film ) {
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
    window.scrollTo(0, 0);

  }

  addWin() {
    if( this.state.foundPath[ this.state.foundPath.length - 1 ].tmdb_id === this.state.challenge[ 1 ].tmdb_id ) {
      const wins = JSON.parse( localStorage.getItem('wins') ) || {};
      const streak = +localStorage.getItem('streak') || 0;
      const lastWin = localStorage.getItem('lastWin');
      const today = new Date().setHours( 0, 0, 0, 0 );

      if( !wins[ today ] ) {
        if( +lastWin === today - 24 * 60 * 60 * 1000 ) {
          localStorage.setItem( 'streak', streak + 1 );
        } else {
          localStorage.setItem( 'streak', 1 );
        }
        this.updateStreak();

        wins[ today ] = [];

      }
      
      wins[ today ] = [ ...wins[today], this.state.foundPath ];
      localStorage.setItem( 'wins', JSON.stringify( wins ) );
      localStorage.setItem( 'lastWin', today );

    }
  }

  takeFilmLink( filmToGoto ) { 
    this.setState({
      ...this.state,
      foundPath: [ ...this.state.foundPath, {
        ...filmToGoto,
        is_film: true
      } ]
    }, () => { this.updateCurrentPath(); this.addWin() } );
  }
  
  takePersonLink( personToGoto ) {
    this.setState({
      ...this.state,
      foundPath: [ ...this.state.foundPath, {
        ...personToGoto,
        is_film: false
      } ]
    }, () => { this.updateCurrentPath(); this.addWin() } );
  }

  backtrackPath( toIndex ) {
    if( !this.currentPathIsTodays() ) {
      this.fetchChallenge();
    } else if( toIndex < this.state.foundPath.length ) {
      this.setState({
        ...this.state,
        foundPath: this.state.foundPath.slice( 0, toIndex + 1 )
      }, this.updateCurrentPath )
    }
  }

  replayGame() {
    this.setState({
      ...this.state,
      foundPath: [ this.state.challenge[ 0 ] ]
    }, this.updateCurrentPath );
  }


  updateCurrentPath() {
    localStorage.setItem( 'currentPath', JSON.stringify(this.state.foundPath) );
    localStorage.setItem( 'currentPathDate', new Date().setHours(0, 0, 0, 0))
  }

  currentPathIsTodays() {
    return new Date().setHours(0, 0, 0, 0) === +localStorage.getItem( 'currentPathDate' );
  }

  updateStreak() {
    this.setState({
      ...this.state,
      streak: localStorage.getItem('streak')
    });
  }

  render() {
    if( this.state.foundPath.length && this.state.challenge.length ) {
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
              key={ this.state.foundPath.length && this.state.foundPath[ this.state.foundPath.length - 1 ].tmdb_id }>
            </MovieNodeView>
            <WinScreen
              path={this.state.foundPath}
              gameWon={ this.state.foundPath[ this.state.foundPath.length - 1].tmdb_id == this.state.challenge[ 1 ].tmdb_id }
              restartGame={ this.replayGame.bind( this ) }
              streak={this.state.streak}></WinScreen>
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
