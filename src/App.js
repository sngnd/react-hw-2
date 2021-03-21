import "./App.css";
import React from "react";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Box } from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      inputValue: "",
      api_key: "Gm0QahiVXispLYIZYjcjymInLogOnttki8V5I31t",
      errorText: "initial",
    };
  }

  handleOnChange = (event) => {
    const inputText = event.target.value;
    let dateFormat = /^\d{4}[/-](0[1-9]|1[012])[/-]([0-2][0-9]|3[01])$/; // YYYY-MM-DD
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

  getData = () => {
    return (
      <img src={this.state.data.hdurl} width="30%" height="auto" alt=""></img>
    );
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    const axios = require("axios");
    axios
      .get(`https://api.nasa.gov/planetary/apod`, {
        params: {
          api_key: this.state.api_key,
          date: this.state.inputValue,
        },
      })
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  };

  render() {
    return (
      <div>
        <div className="form__wrapper">
          <form onSubmit={this.handleOnSubmit}>
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
              value={this.state.inputValue}
              label="Enter date"
              required
              onChange={this.handleOnChange}
              size="medium"
            ></TextField>
            <Box mt={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={this.state.errorText.length === 0 ? false : true}
              >
                Ok
              </Button>
            </Box>
          </form>
        </div>
        <div className="image__wrapper">{this.getData()}</div>
      </div>
    );
  }
}

export default App;
