import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, Typography } from '@mui/material';
import { IosShare, Replay } from '@mui/icons-material'
import Film from './Film';
import Person from './Person';

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
    }).map( node => [ node, <div style={{'text-align': 'center'}}>&#x2193;</div> ]).flat();
    pathViewer.pop();


    return (
      <Dialog open={ this.props.gameWon } maxWidth="lg" fullWidth={true}>
        <div className="winDialog">
            <DialogActions sx={{justifyContent: 'space-evenly'}}>
                <Button variant="contained" endIcon={<Replay />} onClick={ this.props.restartGame }> Find Another Route </Button>
                <Button variant="contained" endIcon={<IosShare />} disabled={true}> Share </Button>
            </DialogActions>
            <DialogContent>
                <Typography> Found in { numSteps } step{ numSteps == 1 ? '' : 's'}:</Typography>
                { pathViewer }
            </DialogContent>
            
        </div>
        
        
      </Dialog>
    );

  }
}
export default WinScreen;
