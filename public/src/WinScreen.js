import React from 'react'
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, Typography } from '@mui/material';
import { IosShare, Replay } from '@mui/icons-material'
import Film from './Film';
import Person from './Person';
import './WinScreen.css';

class WinScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      copied: false
    };
  }

  getBestScore() {
    const today = new Date().setHours(0,0,0,0);
    const allWins = JSON.parse(localStorage.getItem('wins'))
    return allWins && allWins[ today ] && allWins[ today ].reduce( ( a, b ) => Math.min( a, b.length ), 10000 ) - 1

  }

  shareWin() {
    const bestScore = this.getBestScore();

    let pathNodeIsFilm = this.props.path[ 0 ].is_film;
    let walkedPath = pathNodeIsFilm ? '\uD83C\uDFAC' : '\uD83D\uDC64';

    for( let i=1; i <= bestScore; i++ ) {
      pathNodeIsFilm = !pathNodeIsFilm;
      walkedPath += ' \u2794 ' + (pathNodeIsFilm ? '\uD83C\uDFAC' : '\uD83D\uDC64')
    }

    const firstNode = this.props.path[ 0 ].is_film ? this.props.path[ 0 ].title : this.props.path[ 0 ].name;
    const lastNode = this.props.path[ this.props.path.length - 1 ].is_film ? this.props.path[ this.props.path.length - 1 ].title : this.props.path[ this.props.path.length - 1 ].name;


    const winText = `MovieWalker ${ new Date().toLocaleDateString() }\nScore: ${ bestScore }\n\n` +
      `${ firstNode }\n${ walkedPath }\n${ lastNode } \n\nhttps://moviewalker.app`;
    navigator.clipboard.writeText( winText );

    this.setState({ copied: true })
    setTimeout(() => {
      this.setState({ copied: false })
    }, 2500);
  }

  render() {

    const numSteps = this.props.path?.length - 1;

    const pathViewer = this.props.path?.map( node => {
      if( node.is_film ) {
        return <Film
          title={ node.title }
          imgPath={ node.poster_path }
          key={'win' + node.tmdb_id }
        ></Film>
      } else {
        return <Person
        name={ node.name }
        imgPath={ node.profile_path }
        key={'win' + node.tmdb_id }
        ></Person>
      }
    }).map(
      ( node, i ) => [
        node,
        <div style={{textAlign: 'center'}} key={'winarrow' + i }>&#x2193;</div>
      ]
    ).flat();
    pathViewer.pop();

    const bestScore = this.getBestScore();

    return (
      <Dialog open={ this.props.gameWon } maxWidth="lg" fullWidth={true}>
      <div className="winDialog">
        <Typography
          sx={{textAlign: 'center', marginTop: '25px', marginBottom: '10px'}}
          variant="h3"> 
          You Win!
        </Typography>
        <DialogActions sx={{justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
          <div className="scoreIndicator" key={"streak-indicator-win-" + this.props.gameWon}>
            <Typography variant="h4">{ this.props.streak }</Typography>
            <Typography variant="overline">Streak</Typography>
          </div>
          <div className="scoreIndicator">
            <Typography variant="h4">
              { Math.min( bestScore, this.props.path.length - 1 ) || this.props.path.length - 1 }
            </Typography>
            <Typography variant="overline">Today's Best</Typography>
          </div>
          <Button variant="contained" endIcon={<Replay />} onClick={ this.props.restartGame }> Find Another </Button>
          <Button variant="contained" endIcon={ this.state.copied ? '' : <IosShare />}  onClick={ this.shareWin.bind( this ) }> { this.state.copied ? 'Copied!' : 'Share' } </Button>
        </DialogActions>
        <DialogContent>
          <Typography sx={{textAlign: 'center'}} variant="h6"> Found in { numSteps } step{ numSteps == 1 ? '' : 's'}:</Typography>
          { pathViewer }
        </DialogContent>
        
      </div>
      
      
      </Dialog>
    );

  }
}
export default WinScreen;
