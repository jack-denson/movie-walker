import React from 'react'
import defaultFilmImage from './defaultFilmImg.jpg';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

class Film extends React.Component {

  render() {
    return (
          <Card variant="outlined" sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 92 }}
                image={this.props.imgPath ? `https://image.tmdb.org/t/p/w92${ this.props.imgPath }` : defaultFilmImage }
                alt={ this.props.title }
                loading="lazy"
              />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography component="div" variant="h5">
                { this.props.title }
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  { this.props.credit }
                </Typography>
              </CardContent>
            </Box>
          </Card>
    );

  }
}
export default Film;
