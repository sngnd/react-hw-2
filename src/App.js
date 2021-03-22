import "./App.css";
import React from "react";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/core";
import DateInput from "./components/InputDate";
import DataRow from "./components/DataRow";
import Data from "./components/Data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dataArray: [],
      inputValue: "",
      api_key: "Gm0QahiVXispLYIZYjcjymInLogOnttki8V5I31t",
      isDateRange: false,
      startDate: "",
      endDate: "",
    };
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    if (!this.state.isDateRange) {
      this.getDateInfo();
    } else {
      this.getRangeDateInfo();
    }
  };

  getDateInfo = () => {
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

  getRangeDateInfo = async () => {
    const dateArray = this.state.inputValue.split("/");
    await this.setState({ startDate: dateArray[0], endDate: dateArray[1] });
    const axios = require("axios");
    axios
      .get(`https://api.nasa.gov/planetary/apod`, {
        params: {
          api_key: this.state.api_key,
          start_date: this.state.startDate,
          end_date: this.state.endDate,
        },
      })
      .then((response) => {
        this.setState({
          dataArray: [...this.state.dataArray, ...response.data],
        });
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

  updateIsDateRange = (value) => {
    this.setState({ isDateRange: value });
  };

  getData = () => {
    return this.state.dataArray.map((item) => (
      <Data
        key={new Date().getDate() + item.date}
        date={item.date}
        explanation={item.explanation}
        hdurl={item.hdurl}
      ></Data>
    ));
  };

  render() {
    return (
      <div>
        <div className="form__wrapper">
          <form onSubmit={this.handleOnSubmit}>
            <DateInput
              handleOnChange={this.handleOnChange}
              value={this.state.inputValue}
              updateIsDateRange={this.updateIsDateRange}
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
          {this.state.isDateRange ? (
            this.getData()
          ) : (
            <DataRow
              date={this.state.data.date}
              explanation={this.state.data.explanation}
              hdurl={this.state.data.hdurl}
            ></DataRow>
          )}
        </div>
      </div>
    );
  }
}

export default App;
