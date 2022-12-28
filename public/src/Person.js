import React from 'react'
import defaultPersonImg from './defaultPersonImg.jpg';

class Person extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    
    return (
        <div>
            <img
                src={this.props.imgPath ? `https://image.tmdb.org/t/p/w92${ this.props.imgPath }` : defaultPersonImg }
                alt={ this.props.name }
                loading="lazy">
            </img>
            { this.props.name } - <i>{ this.props.role }</i>
        </div>
    );

  }
}
export default Person;
