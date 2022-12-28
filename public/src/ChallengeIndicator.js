import React from 'react'

class ChallengeIndicator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    return (
        <div>
            <span className="challengeFrom">
                {this.props.challenge[ 0 ].title || this.props.challenge[ 0 ].name }
            </span>
            <span> &#8594; </span>
            <span className="challengeTo">
                {this.props.challenge[ 1 ].title || this.props.challenge[ 1 ].name }
            </span>
        </div>
    );

  }
}
export default ChallengeIndicator;
