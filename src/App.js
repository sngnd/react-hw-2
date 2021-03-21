import "./App.css";
import React from "react";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";
import DateInput from "./components/InputDate";
import DataRow from "./components/DataRow";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      inputValue: "",
      api_key: "Gm0QahiVXispLYIZYjcjymInLogOnttki8V5I31t",
    };
  }

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
        console.log(response.data);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  };

  handleOnChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="form__wrapper">
          <form onSubmit={this.handleOnSubmit}>
            <DateInput
              handleOnChange={this.handleOnChange}
              value={this.state.inputValue}
            ></DateInput>
            <Box mt={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Ok
              </Button>
            </Box>
          </form>
        </div>
        <div className="data__wrapper">
          <DataRow
            date={this.state.data.date}
            explanation={this.state.data.explanation}
            hdurl={this.state.data.hdurl}
          ></DataRow>
        </div>
      </div>
    );
  }
}

export default App;
