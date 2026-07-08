import React from 'react'
import './ChallengeIndicator.css';

class ChallengeIndicator extends React.Component {

  nodeImage( node ) {
    const imgPath = node.is_film ? node.poster_path : node.profile_path;
    return `https://image.tmdb.org/t/p/w154${ imgPath }`;
  }

  render() {
    const [ from, to ] = this.props.challenge;

    return (
        <section className="challengeCard">
            <p className="challengeEyebrow">Today&rsquo;s Challenge</p>
            <div className="challengeRow">
              <div className="challengeNode">
                <img
                  src={ this.nodeImage( from ) }
                  alt={ from.title || from.name }
                />
                <div className="challengeNodeText">
                  <span className="challengeLabel">Start</span>
                  <span className="challengeName">{ from.title || from.name }</span>
                </div>
              </div>
              <div className="challengeArrow" aria-hidden="true">
                <span className="challengeArrowLine"></span>
                <span className="challengeArrowHead">&#8594;</span>
              </div>
              <div className="challengeNode challengeGoal">
                <img
                  src={ this.nodeImage( to ) }
                  alt={ to.title || to.name }
                />
                <div className="challengeNodeText">
                  <span className="challengeLabel challengeLabelGoal">Goal</span>
                  <span className="challengeName">{ to.title || to.name }</span>
                </div>
              </div>
            </div>
            <p className="challengeHint">
              Walk from start to goal using only cast, crew, and the films they made.
            </p>
        </section>
    );

  }
}
export default ChallengeIndicator;
