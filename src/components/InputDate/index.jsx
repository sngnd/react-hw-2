import { TextField } from "@material-ui/core";
import React from "react";

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: "initial",
    };
  }

  handleOnChange = (event) => {
    this.props.handleOnChange(event);
    const inputText = event.target.value;
    let dateFormat = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[1-2][0-9]|3[01])$/; // YYYY-MM-DD
    inputText.search(dateFormat) !== -1
      ? this.isDateValid(inputText)
        ? this.setState({ errorText: "" })
        : this.setState({ errorText: "Date is invalid" })
      : this.setState({ errorText: "Required format: YYYY-MM-DD" });
    this.setState({
      inputValue: event.target.value,
    });
  };

  isDateValid = (date) => {
    const inputDate = new Date(date);
    return inputDate > new Date() || isNaN(inputDate) ? false : true;
  };

  render() {
    return (
      <TextField
        error={
          this.state.errorText.length === 0 ||
          this.state.errorText === "initial"
            ? false
            : true
        }
        helperText={
          this.state.errorText === "initial" ? "" : this.state.errorText
        }
        value={this.props.value}
        label="Enter date"
        required
        onChange={this.handleOnChange}
      ></TextField>
    );
  }
}

export default DateInput;
