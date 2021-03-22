import { TextField } from "@material-ui/core";
import React from "react";

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: "",
    };
  }

  handleOnChange = (event) => {
    this.props.handleOnChange(event);
    const inputText = event.target.value;
    let dateFormat = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[1-2][0-9]|3[01])$/; // YYYY-MM-DD
    let dateRangeFormat = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[1-2][0-9]|3[01])\/\d{4}-(0[1-9]|1[012])-(0[1-9]|[1-2][0-9]|3[01])$/; // YYYY-MM-DD/YYYY-MM-DD; // YYYY-MM-DD/YYYY-MM-DD

    if (inputText.search(dateFormat) !== -1) {
      this.isDateValid(inputText)
        ? this.setState({ errorText: "" })
        : this.setState({ errorText: "Date is invalid" });
      this.props.updateIsDateRange(false);
    } else if (inputText.search(dateRangeFormat) !== -1) {
      this.isDateRangeValid(inputText)
        ? this.setState({ errorText: "" })
        : this.setState({ errorText: "Date range is invalid" });
      this.props.updateIsDateRange(true);
    } else {
      this.setState({
        errorText: "Format is invalid",
      });
    }

    this.setState({
      inputValue: event.target.value,
    });
  };

  isDateRangeValid = (date) => {
    const arrayOfDate = date.split("/");
    const startDate = new Date(arrayOfDate[0]);
    const endDate = new Date(arrayOfDate[1]);
    return !this.isDateValid(startDate) ||
      !this.isDateValid(endDate) ||
      startDate >= endDate
      ? false
      : true;
  };

  isDateValid = (date) => {
    const inputDate = new Date(date);
    return inputDate > new Date() || isNaN(inputDate) ? false : true;
  };

  render() {
    return (
      <TextField
        error={this.state.errorText.length === 0 ? false : true}
        helperText={this.state.errorText}
        value={this.props.value}
        label="Enter date or range"
        required
        onChange={this.handleOnChange}
      ></TextField>
    );
  }
}

export default DateInput;
