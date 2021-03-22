import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DataRow from "../DataRow";
import React from "react";

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{this.props.date}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            <DataRow
              date={this.props.date}
              explanation={this.props.explanation}
              hdurl={this.props.hdurl}
            ></DataRow>
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default Data;
