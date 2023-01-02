import React from 'react'
import defaultPersonImg from './defaultPersonImg.jpg';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


class Person extends React.Component {

  render() {
    return (
      <Card variant="outlined" sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ width: 92 }}
          image={ this.props.imgPath ? `https://image.tmdb.org/t/p/w92${ this.props.imgPath }` : defaultPersonImg }
          alt={ this.props.name }
          loading="lazy"
        />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography component="div" variant="h5">
          { this.props.name }
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            { this.props.role }
          </Typography>
        </CardContent>
      </Box>
    </Card>
    );

  }
}
export default Person;
