
import React from 'react';
import Person from './Person';
import Film from './Film';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import './MovieNodeView.css'

class MovieNodeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    };
  }

  async getAllCredits() {
    const api_url = `/link/${ this.props.current.tmdb_id }${ this.props.current.is_film ? '?is_film=true' : '' }`;
    this.setState({ loading: true });
    const api_res = await fetch( api_url );
    this.setState({ loading: false });
    const movieNode = await api_res.json();
    this.setState( { movieNode } );
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

  getLoaders() {
    return Array.from(new Array(4)).map(
      (x, i) => <Skeleton key={"loader_" + i} variant="rounded" width="100%" height={140} sx={{backgroundColor: 'darkgray', marginBottom: "1vh"}} />
    )
  }

  takeLink( link ) {
    this.props.takeLink( link );
  }

  render() {
    const { cast_credits, crew_credits } = this.props.current.is_film ? this.getFilmCastAndCrew() : this.getPersonCredits();

    return (
      <div style={{ paddingTop: '2vh', minHeight: "70vh"}}>
        <Typography component="div" variant="h4" style={{textAlign: 'center'}}>
          { this.props.current.name || this.props.current.title }
        </Typography>
        <div className="rolesHeader">
          <Typography component="div" variant="h5" className="rolesHeader">
            {this.props.current.is_film ? 'Cast' : 'Roles in Cast '}
          </Typography>
        </div>
        <div className="linksPane">
          <div>
            { this.state.loading ? this.getLoaders() : cast_credits }
          </div>
        </div>
        {
          crew_credits.length > 0 &&
          <div className="rolesHeader">
            <Typography component="div" variant="h5">
              {this.props.current.is_film ? 'Crew' : 'Roles in Crew '}
            </Typography>
          </div>          
        }
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
