
import React from 'react';
import axios from 'axios';
import Person from './Person';
import Film from './Film';

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
        <div>
            <h2> { this.props.current.name || this.props.current.title } </h2>
            <h3> Cast </h3>
            <div>
                { cast_credits }
            </div>
            <h3> Crew </h3>
            <div>
                { crew_credits }
            </div>
        </div>
    );

  }
}
export default MovieNodeView;
