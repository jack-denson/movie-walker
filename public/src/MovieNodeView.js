
import React from 'react';
import Person from './Person';
import Film from './Film';
import defaultFilmImage from './defaultFilmImg.jpg';
import defaultPersonImg from './defaultPersonImg.jpg';
import './MovieNodeView.css'

class MovieNodeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      filter: ''
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

  matchesFilter( credit ) {
    const filter = this.state.filter.trim().toLowerCase();
    if( !filter ) return true;
    return ( credit.name || credit.title || '' ).toLowerCase().includes( filter );
  }

  getCredits() {
    if( this.props.current.is_film ) {
      return {
        cast: this.state.movieNode?.credits?.cast || [],
        crew: this.state.movieNode?.credits?.crew || []
      };
    }

    // Most popular films first
    const byVotes = ( a, b ) => ( b.vote_count || 0 ) - ( a.vote_count || 0 );
    return {
      cast: [ ...( this.state.movieNode?.movie_credits?.cast || [] ) ].sort( byVotes ),
      crew: [ ...( this.state.movieNode?.movie_credits?.crew || [] ) ].sort( byVotes )
    };
  }

  renderCredit( credit, i, kind ) {
    const is_film_node = this.props.current.is_film;
    return (
      <button
        key={ i + "_" + kind + "_" + credit.tmdb_id }
        onClick={ this.takeLink.bind( this, credit ) }
        className="creditButton"
      >
        { is_film_node ?
          <Person
            name={ credit.name }
            role={ kind === 'cast' ? credit.role : credit.job }
            imgPath={ credit.profile_path }
          ></Person> :
          <Film
            title={ credit.title }
            credit={ kind === 'cast' ? credit.role : credit.job }
            release={ credit.release }
            imgPath={ credit.poster_path }
          ></Film>
        }
      </button>
    );
  }

  getLoaders() {
    return Array.from(new Array(8)).map(
      (x, i) => (
        <div className="creditSkeleton" key={"loader_" + i}>
          <div className="creditSkeletonImg"></div>
          <div className="creditSkeletonLines">
            <div className="creditSkeletonLine"></div>
            <div className="creditSkeletonLine creditSkeletonLineShort"></div>
          </div>
        </div>
      )
    )
  }

  takeLink( link ) {
    this.props.takeLink( link );
  }

  render() {
    const current = this.props.current;
    const { cast, crew } = this.getCredits();
    const filteredCast = cast.filter( credit => this.matchesFilter( credit ) );
    const filteredCrew = crew.filter( credit => this.matchesFilter( credit ) );

    const heroImgPath = current.is_film ? current.poster_path : current.profile_path;
    const heroImg = heroImgPath ?
      `https://image.tmdb.org/t/p/w185${ heroImgPath }` :
      ( current.is_film ? defaultFilmImage : defaultPersonImg );

    return (
      <div className="nodeView">
        <header className="nodeHero">
          <img className="nodeHeroImg" src={ heroImg } alt="" />
          <div className="nodeHeroText">
            <p className="nodeKicker">
              You are at &middot; { current.is_film ? 'Film' : 'Person' }
            </p>
            <h2 className="nodeTitle">
              { current.name || current.title }
              { current.is_film && current.release &&
                <span className="nodeYear"> ({ current.release })</span> }
            </h2>
            <p className="nodeHint">
              { current.is_film ?
                'Pick a cast or crew member to walk to.' :
                'Pick one of their films to walk to.' }
            </p>
          </div>
        </header>

        <div className="nodeFilter">
          <span className="nodeFilterIcon" aria-hidden="true">&#128269;</span>
          <input
            className="nodeFilterInput"
            type="search"
            placeholder={ current.is_film ? 'Filter cast & crew…' : 'Filter films…' }
            value={ this.state.filter }
            onChange={ e => this.setState({ filter: e.target.value }) }
            aria-label={ current.is_film ? 'Filter cast and crew' : 'Filter films' }
          />
        </div>

        <h3 className="rolesHeader">
          { current.is_film ? 'Cast' : 'Acted In' }
          { !this.state.loading &&
            <span className="rolesCount">{ filteredCast.length }</span> }
        </h3>
        <div className="linksPane">
          { this.state.loading ?
            this.getLoaders() :
            filteredCast.map( ( credit, i ) => this.renderCredit( credit, i, 'cast' ) ) }
        </div>
        { !this.state.loading && filteredCast.length === 0 &&
          <p className="emptyNote">No matches{ this.state.filter ? ` for “${ this.state.filter }”` : '' }.</p> }

        { !this.state.loading && crew.length > 0 && <>
          <h3 className="rolesHeader">
            { current.is_film ? 'Crew' : 'Crew Work' }
            <span className="rolesCount">{ filteredCrew.length }</span>
          </h3>
          <div className="linksPane">
            { filteredCrew.map( ( credit, i ) => this.renderCredit( credit, i, 'crew' ) ) }
          </div>
          { filteredCrew.length === 0 &&
            <p className="emptyNote">No matches{ this.state.filter ? ` for “${ this.state.filter }”` : '' }.</p> }
        </> }
      </div>
    );

  }
}
export default MovieNodeView;
