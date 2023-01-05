
import React from 'react';
import axios from 'axios';
import Person from './Person';
import Film from './Film';
import Typography from '@mui/material/Typography';
import './MovieNodeView.css'

class MovieNodeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  async getAllCredits() {
    const api_url = `http://localhost:4000/link/${ this.props.current.tmdb_id }${ this.props.current.is_film ? '?is_film=true' : '' }`;
    const { data: api_res } = await axios.get( api_url );
    this.setState( { movieNode: api_res } )
  }

  async componentDidMount() {
    this.getAllCredits();
  }

  getFilmCastAndCrew() {
    let cast_credits = [];
    for( let i = 0; i < this.state.movieNode?.credits.cast?.length || 0; i++ ) {
      const credit = this.state.movieNode.credits.cast[ i ];
      cast_credits.push(
        <div
          key={ i + "_cast_" + credit.id}
          onClick={ this.takeLink.bind( this, credit ) }
          className="clickableCredit"
        >
          <Person
            name={ credit.name }
            role={ credit.role }
            imgPath={ credit.profile_path }
          ></Person>
        </div>
      );
    }
    let crew_credits = [];
    for( let i = 0; i < this.state.movieNode?.credits.crew?.length || 0; i++ ) {
      const credit = this.state.movieNode.credits.crew[ i ];
      crew_credits.push(
        <div
          key={ i + "_crew_" + credit.id}
          onClick={ this.takeLink.bind( this, credit ) }
          className="clickableCredit"
        >
          <Person
            name={ credit.name }
            role={ credit.job }
            imgPath={ credit.profile_path }
          ></Person>
        </div>
      );
    }

    return {
      cast_credits,
      crew_credits
    }
  }

  getPersonCredits() {
    let cast_credits = [];
    for( let i = 0; i < this.state.movieNode?.movie_credits.cast?.length || 0; i++ ) {
      const credit = this.state.movieNode.movie_credits.cast[ i ];
      cast_credits.push(
        <div
          onClick={ this.takeLink.bind( this, credit ) }
          key={ i + "_cast_" + credit.id}
          className="clickableCredit"
        >
          <Film
            title={ credit.title }
            imgPath={ credit.poster_path }
            credit={ credit.role }
          ></Film>
        </div>

      );
    }
    let crew_credits = [];
    for( let i = 0; i < this.state.movieNode?.movie_credits.crew?.length || 0; i++ ) {
      const credit = this.state.movieNode.movie_credits.crew[ i ];
      crew_credits.push(
        <div
          onClick={ this.takeLink.bind( this, credit ) }
          key={ i + "_crew_" + credit.id}
          className="clickableCredit"
        >
          <Film
            title={ credit.title }
            imgPath={ credit.poster_path }
            credit={ credit.job }
          ></Film>
        </div>
      );
    }
    return { cast_credits, crew_credits }

  }

  takeLink( link ) {
    this.props.takeLink( link );
  }

  render() {
    const { cast_credits, crew_credits } = this.props.current.is_film ? this.getFilmCastAndCrew() : this.getPersonCredits();

    return (
      <div style={{ 'padding-top': '2vh'}}>
        <Typography component="div" variant="h4" style={{'text-align': 'center'}}>
          { this.props.current.name || this.props.current.title }
        </Typography>
        <div className="rolesHeader">
          <Typography component="div" variant="h5" className="rolesHeader">
            {this.props.current.is_film ? 'Cast' : 'Roles in Cast '}
          </Typography>
        </div>
        <div className="linksPane">
          <div>
            { cast_credits }
          </div>
        </div>
        <div className="rolesHeader">
          <Typography component="div" variant="h5">
            {this.props.current.is_film ? 'Crew' : 'Roles in Crew '}
          </Typography>
        </div>
        <div className="linksPane">
          <div>
            { crew_credits }
          </div>
        </div>
      </div>
    );

  }
}
export default MovieNodeView;
