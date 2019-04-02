import React from "react";
import { Button, Spinner } from "reactstrap";
import PlayIcon from "mdi-react/PlayIcon";
import PauseIcon from "mdi-react/PauseIcon";
import SkipNextIcon from "mdi-react/SkipNextIcon";

const AskScreenContinueButton = props => {
  const { hasNextQuestion, nextAskScreenState } = props;
  const buttonState = {
    // Waiting for clients, button disabled
    0: {
      text: (
        <>
          <Spinner size="sm" className="mr-2" /> Waiting for clients to start
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
      text: (
        <>
          <PlayIcon style={{ paddingBottom: "3px" }} /> Start Question
        </>
      ),
      color: "primary"
    },
    // Accepting answers
    2: {
      text: (
        <>
          <PauseIcon style={{ paddingBottom: "3px" }} /> Stop Question
        </>
      ),
      color: "primary"
    },
    3: {
      text: (
        <>
          <SkipNextIcon style={{ paddingBottom: "3px" }} /> Next Question
        </>
      ),
      color: "secondary",
      additionalButtonProps: {
        disabled: !hasNextQuestion
      }
    }
  };

  const { currentAskScreenState } = props;
  const currentPhaseObj = buttonState[currentAskScreenState];
  return (
    <Button
      color={currentPhaseObj.color}
      outline={currentPhaseObj.outline}
      block
      onClick={nextAskScreenState}
      {...currentPhaseObj &&
        currentPhaseObj.additionalButtonProps &&
        currentPhaseObj.additionalButtonProps}
    >
      {currentPhaseObj.text}
    </Button>
  );
};

export default AskScreenContinueButton;
