import React from 'react'
import defaultPersonImg from './defaultPersonImg.jpg';

class Film extends React.Component {

  render() {
    return (
        <div>
            <img
                src={this.props.imgPath ? `https://image.tmdb.org/t/p/w92${ this.props.imgPath }` : defaultPersonImg }
                alt={ this.props.title }
                loading="lazy">
            </img>
            { this.props.title } - <i> { this.props.credit }</i>
        </div>
    );

  }
}
export default Film;
