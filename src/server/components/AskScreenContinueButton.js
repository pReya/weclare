import React from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import PlayIcon from "mdi-react/PlayIcon";
import PauseIcon from "mdi-react/PauseIcon";
import SkipForwardIcon from "mdi-react/SkipForwardIcon";
import MDSpinner from "react-md-spinner";
import {
  toggleAcceptingAnswers,
  sendCurrentQuestionToClients,
  incrementQuestionIdx,
  stopAcceptingConnections
} from "../actions/server";
import { isConnected, hasNextQuestion } from "../selectors/server";

const mapStateToProps = state => ({
  isConnected: isConnected(state),
  hasNextQuestion: hasNextQuestion(state)
});

const mapDispatchToProps = {
  sendCurrentQuestionToClients,
  toggleAcceptingAnswers,
  stopAcceptingConnections,
  incrementQuestionIdx
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

  nextButtonPhase = () => {
    const { buttonPhase } = this.state;

    // Transition from 0 -> 1 must happen in getDerivedStateFromProps(), because it's based on clients
    if (buttonPhase > 0) {
      this.setState(prevState => ({
        buttonPhase: (prevState.buttonPhase + 1) % 4
      }));
    }
  };

  render() {
    const {
      toggleAcceptingAnswers,
      stopAcceptingConnections,
      sendCurrentQuestionToClients,
      incrementQuestionIdx,
      hasNextQuestion
    } = this.props;
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
          stopAcceptingConnections();
          toggleAcceptingAnswers();
          sendCurrentQuestionToClients();
          this.nextButtonPhase();
        },
        text: (
          <>
            <PlayIcon style={{ paddingBottom: "3px" }} /> Start Quiz
          </>
        ),
        color: "primary"
      },
      // Accepting answers
      2: {
        onClick: () => {
          toggleAcceptingAnswers();
          this.nextButtonPhase();
        },
        text: (
          <>
            <PauseIcon style={{ paddingBottom: "3px" }} /> Stop Question
          </>
        ),
        color: "primary"
      },
      // // Don't accept answers, waiting to show results
      // 3: {
      //   onClick: () => {
      //     toggleShowVoteCount();
      //     this.nextButtonPhase();
      //   },
      //   text: (
      //     <>
      //       <FormatListNumberedIcon style={{ paddingBottom: "3px" }} /> Show
      //       Results
      //     </>
      //   ),
      //   color: "primary"
      // },
      3: {
        onClick: () => {
          incrementQuestionIdx();
          this.nextButtonPhase();
        },
        text: (
          <>
            <SkipForwardIcon style={{ paddingBottom: "3px" }} /> Next Question
          </>
        ),
        color: "secondary",
        additionalButtonProps: {
          disabled: !hasNextQuestion
        }
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
