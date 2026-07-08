import React from 'react'
import defaultFilmImage from './defaultFilmImg.jpg';
import './Credit.css';

class Film extends React.Component {

  render() {
    return (
      <div className="creditCard">
        <img
          className="creditImg"
          src={ this.props.imgPath ? `https://image.tmdb.org/t/p/w92${ this.props.imgPath }` : defaultFilmImage }
          alt={ this.props.title }
          loading="lazy"
        />
        <div className="creditInfo">
          <span className="creditName">{ this.props.title }</span>
          { this.props.credit &&
            <span className="creditRole">{ this.props.credit }</span> }
          { this.props.release &&
            <span className="creditMeta">{ this.props.release }</span> }
        </div>
      </div>
    );

  }
}
export default Film;
