import React from 'react'
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, Typography } from '@mui/material';
import { IosShare, Replay } from '@mui/icons-material'
import Film from './Film';
import Person from './Person';
import './WinScreen.css';

class WinScreen extends React.Component {

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

  const today = new Date().setHours(0,0,0,0);
  const allWins = JSON.parse(localStorage.getItem('wins'))
  const bestScore = allWins && allWins[ today ] && allWins[ today ].reduce( ( a, b ) => Math.min( a, b.length ), 10000 ) - 1


  return (
    <Dialog open={ this.props.gameWon } maxWidth="lg" fullWidth={true}>
    <div className="winDialog">
      <Typography
        sx={{textAlign: 'center', marginTop: '25px', marginBottom: '10px'}}
        variant="h3"> 
        You Win!
      </Typography>
      <DialogActions sx={{justifyContent: 'space-evenly'}}>
        <div className="scoreIndicator">
          <Typography variant="h4">{ localStorage.getItem('streak') || 0 }</Typography>
          <Typography variant="overline">Streak</Typography>
        </div>
        <div className="scoreIndicator">
          <Typography variant="h4">
            { bestScore }
          </Typography>
          <Typography variant="overline">Today's Best</Typography>
        </div>

        <Button variant="contained" endIcon={<Replay />} onClick={ this.props.restartGame }> Find Another </Button>
        <Button variant="contained" endIcon={<IosShare />} disabled={true}> Share </Button>
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
