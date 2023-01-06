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


  return (
    <Dialog open={ this.props.gameWon } maxWidth="lg" fullWidth={true}>
    <div className="winDialog">
      <Typography
        sx={{textAlign: 'center', marginTop: '25px', marginBottom: '10px'}}
        variant="h3"> 
        You Win!
      </Typography>
      <DialogActions sx={{justifyContent: 'space-evenly'}}>
        <Button variant="contained" endIcon={<Replay />} onClick={ this.props.restartGame }> Find Another Route </Button>
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
