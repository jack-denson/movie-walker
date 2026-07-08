import React from 'react'
import defaultPersonImg from './defaultPersonImg.jpg';
import './Credit.css';

class Person extends React.Component {

  render() {
    return (
      <div className="creditCard">
        <img
          className="creditImg"
          src={ this.props.imgPath ? `https://image.tmdb.org/t/p/w92${ this.props.imgPath }` : defaultPersonImg }
          alt={ this.props.name }
          loading="lazy"
        />
        <div className="creditInfo">
          <span className="creditName">{ this.props.name }</span>
          { this.props.role &&
            <span className="creditRole">{ this.props.role }</span> }
        </div>
      </div>
    );

  }
}
export default Person;
