import React from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import PlayIcon from "mdi-react/PlayIcon";
import PauseIcon from "mdi-react/PauseIcon";
import SkipForwardIcon from "mdi-react/SkipForwardIcon";
import FormatListNumberedIcon from "mdi-react/FormatListNumberedIcon";
import MDSpinner from "react-md-spinner";
import {
  toggleAcceptingAnswers,
  sendCurrentQuestionToClients
} from "../actions/server";
import isConnected from "../selectors/server";

const mapStateToProps = state => ({
  isConnected: isConnected(state)
});

const mapDispatchToProps = {
  sendCurrentQuestionToClients,
  toggleAcceptingAnswers
};

class AskScreenContinueButton extends React.Component {
  state = {
    buttonPhase: 0
  };

  static getDerivedStateFromProps(props, state) {
    if (props.isConnected && state.buttonPhase === 0) {
      return {
        buttonPhase: 1
      };
    }
    return null;
  }

  render() {
    const { toggleAcceptingAnswers, sendCurrentQuestionToClients } = this.props;
    const buttonStateMachine = {
      // Waiting for clients, button disabled
      0: {
        text: (
          <>
            <MDSpinner singleColor="#8a817c" size={16} /> Waiting for clients
          </>
        ),
        color: "primary",
        additionalButtonProps: {
          outline: true,
          disabled: true
        }
      },
      // Clients connected, ready to send first question and accept answers
      1: {
        onClick: () => {
          toggleAcceptingAnswers();
          sendCurrentQuestionToClients();
          this.setState({
            buttonPhase: 2
          });
        },
        text: (
          <>
            <PlayIcon style={{ paddingBottom: "3px" }} /> Start Quiz
          </>
        ),
        color: "secondary"
      },
      2: {
        onClick: () => {
          // toggleAcceptingAnswers();
          this.setState({
            buttonPhase: 3
          });
        },
        text: (
          <>
            <PauseIcon style={{ paddingBottom: "3px" }} /> Stop Question
          </>
        ),
        color: "secondary"
      },
      3: {
        onClick: () => {
          // countAnswers(registeredAnswers, currentQuestionIdx);
          this.setState({
            buttonPhase: 4
          });
        },
        text: (
          <>
            <FormatListNumberedIcon style={{ paddingBottom: "3px" }} /> Show
            Results
          </>
        ),
        color: "secondary"
      },
      4: {
        onClick: () => {
          // setCurrentQuestionIdx(nextQuestionIdx);
          this.setState({
            buttonPhase: 0
          });
        },
        text: (
          <>
            <SkipForwardIcon style={{ paddingBottom: "3px" }} /> Next Question
          </>
        ),
        color: "secondary"
      }
    };

    const { buttonPhase } = this.state;
    const currentPhaseObj = buttonStateMachine[buttonPhase];
    return (
      <Button
        color={currentPhaseObj.color}
        outline={currentPhaseObj.outline}
        block
        onClick={currentPhaseObj.onClick}
        {...currentPhaseObj &&
          currentPhaseObj.additionalButtonProps &&
          currentPhaseObj.additionalButtonProps}
      >
        {currentPhaseObj.text}
      </Button>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AskScreenContinueButton);
