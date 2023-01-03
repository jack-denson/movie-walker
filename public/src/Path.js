import React from 'react'
import './Path.css'
import Link from '@mui/material/Link';

class Path extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    let path = [];
    for( let i = 0; i < this.props.foundPath.length; i++ ) {
        const pathNode = this.props.foundPath[ i ];
        path.push( <Link
          key={ i + "_path_" + pathNode.id }
          onClick={ () => this.props.backtrack( i ) }
          style={{ cursor: 'pointer', color: 'lightskyblue' }}>
            { pathNode.is_film ? pathNode.title : pathNode.name }
        </Link> )
        path.push( <span key={ 'arrow' + i } > &#8594; </span>)
    }
    path.pop();
    return (
        <div className="foundPath">
            { path }
        </div>
    );

  }
}
export default Path;
