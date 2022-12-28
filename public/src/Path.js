import React from 'react'

class Path extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    let path = [];
    for( let i = 0; i < this.props.foundPath.length; i++ ) {
        const pathNode = this.props.foundPath[ i ];
        path.push( <span key={ i + "_path_" + pathNode.id }> { pathNode.is_film ? pathNode.title : pathNode.name } </span> )
        path.push( <span key={ 'arrow' + i } > &#8594; </span>)
    }
    path.pop();
    return (
        <div>
            { path }
        </div>
    );

  }
}
export default Path;
