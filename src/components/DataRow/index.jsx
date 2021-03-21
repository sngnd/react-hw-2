import React from "react";
import "./style.css";

class DataRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row__wrapper">
        <div className="row__image">
          <img src={this.props.hdurl} width="100%" alt=""></img>
        </div>
        <div className="row__info">
          <h3>{this.props.date}</h3>
          <p>{this.props.explanation}</p>
        </div>
      </div>
    );
  }
}

export default DataRow;
