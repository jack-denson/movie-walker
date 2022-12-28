
import React from 'react'
import axios from 'axios';

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

  render() {
    let cast_credits = [];
    for( let i = 0; i < this.state.movieNode?.credits.cast?.length || 0; i++ ) {
        const credit = this.state.movieNode.credits.cast[ i ];
        cast_credits.push( <div key={ i + "_cast_" + credit.id}> {credit.name} - <i>{ credit.role }</i></div> )
    }
    let crew_credits = [];
    for( let i = 0; i < this.state.movieNode?.credits.crew?.length || 0; i++ ) {
        const credit = this.state.movieNode.credits.crew[ i ];
        crew_credits.push( <div key={ i + "_crew_" + credit.id}> {credit.name} - <i> { credit.job }</i></div> )
    }

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
