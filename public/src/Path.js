import React from 'react'
import './Path.css'

class Path extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    const { foundPath } = this.props;
    const steps = foundPath.length - 1;

    return (
        <nav className="pathBar" aria-label="Your path so far">
            <div className="pathScroller">
              { foundPath.map( ( pathNode, i ) => {
                const isCurrent = i === foundPath.length - 1;
                return (
                  <React.Fragment key={ i + "_path_" + pathNode.tmdb_id }>
                    { i > 0 && <span className="pathArrow" aria-hidden="true">&#8594;</span> }
                    <button
                      className={ "pathChip" + ( isCurrent ? " pathChipCurrent" : "" ) }
                      onClick={ () => this.props.backtrack( i ) }
                      title={ isCurrent ? "You are here" : "Backtrack to here" }
                    >
                      <span className="pathChipIcon" aria-hidden="true">
                        { pathNode.is_film ? '🎬' : '👤' }
                      </span>
                      { pathNode.is_film ? pathNode.title : pathNode.name }
                    </button>
                  </React.Fragment>
                );
              }) }
            </div>
            <span className="pathSteps">{ steps } step{ steps === 1 ? '' : 's' }</span>
        </nav>
    );

  }
}
export default Path;
