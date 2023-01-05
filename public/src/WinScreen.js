import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent, Typography } from '@mui/material';
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
            ></Film>
        } else {
            return <Person
            name={ node.name }
            imgPath={ node.profile_path }
          ></Person>
        }
    }).map( node => [ node, <div style={{'text-align': 'center'}}>&#x2193;</div> ]).flat();
    pathViewer.pop();


    return (
      <Dialog open={ this.props.gameWon } maxWidth="lg" fullWidth={true}>
        <div className="winDialog">
            <DialogTitle> You win!! </DialogTitle>
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
