import React from "react";
import "./style.css";

class DataRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <tr>
        <td className="image__td">
          <img src={this.props.hdurl} width="100%" alt=""></img>
        </td>
        <td>
          <h3>{this.props.date}</h3>
          <p>{this.props.explanation}</p>
        </td>
      </tr>
    );
  }
}

export default DataRow;
