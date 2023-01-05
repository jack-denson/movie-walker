import React from 'react'
import './ChallengeIndicator.css';

class ChallengeIndicator extends React.Component {

  render() {
    return (
        <div className="challengeContainer">
            <div className="challengeFrom">
              <img
                src={ this.props.challenge[ 0 ].is_film ? `https://image.tmdb.org/t/p/w92${ this.props.challenge[ 0 ].poster_path }` : `https://image.tmdb.org/t/p/w92${ this.props.challenge[ 0 ].profile_path }` }
                alt={ this.props.name }
              />
            <div className="challengeName">
                {this.props.challenge[ 0 ].title || this.props.challenge[ 0 ].name } </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}> &#8594; </div>
            <div className="challengeTo">
              <div className="challengeName">
                {this.props.challenge[ 1 ].title || this.props.challenge[ 1 ].name }
              </div>
              <img
                src={ this.props.challenge[ 1 ].is_film ? `https://image.tmdb.org/t/p/w92${ this.props.challenge[ 1 ].poster_path }` : `https://image.tmdb.org/t/p/w92${ this.props.challenge[ 1 ].profile_path }` }
                alt={ this.props.name }
              />
            </div>
        </div>
    );

  }
}
export default ChallengeIndicator;
