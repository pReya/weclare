import React from "react";
import { Row, Col, Button } from "reactstrap";
import FormatListNumberedIcon from "mdi-react/FormatListNumberedIcon";
import CheckAllIcon from "mdi-react/CheckAllIcon";
import QuestionCard from "../../shared/components/QuestionCard";
import AskScreenContinueButtonContainer from "./AskScreenContinueButtonContainer";
import { ChevronRight, ChevronLeft } from "../../shared/components/Chevron";
import CodeExecutionArea from "./CodeExecutionArea";

class AskScreen extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      showVoteCount: false,
      showTerminal: false,
      highlightSolutions: false,
      prevQuestion: props.currentQuestion
    };
    this.state = this.initialState;
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.currentQuestion &&
      props.currentQuestion.text !== state.prevQuestion.text
    ) {
      return {
        prevQuestion: props.currentQuestion,
        showTerminal: false,
        showVoteCount: false,
        highlightSolutions: false
      };
    }
    return null;
  }

  toggleShowVoteCount = () => {
    this.setState(prevState => ({
      ...prevState,
      showVoteCount: !prevState.showVoteCount
    }));
  };

  toggleShowTerminal = () => {
    this.setState(prevState => ({
      ...prevState,
      showTerminal: !prevState.showTerminal
    }));
  };

  toggleHighlightSolutions = () => {
    this.setState(prevState => ({
      ...prevState,
      highlightSolutions: !prevState.highlightSolutions
    }));
  };

  resetState() {
    this.setState(this.initialState);
  }

  render() {
    const {
      currentQuestion,
      countedAnswers,
      receivedAnswersCounter,
      hasNextQuestion,
      hasPreviousQuestion,
      incrementQuestionIdx,
      decrementQuestionIdx,
      acceptingAnswers,
      isBusy,
      resetTerminal
    } = this.props;

    const { showVoteCount, highlightSolutions, showTerminal } = this.state;

    const questionHasCodeSnippet = currentQuestion && currentQuestion.code;
    return (
      <Row className="justify-content-center">
        <Col xs="2" className="align-self-center">
          <ChevronLeft
            disabled={!hasPreviousQuestion || acceptingAnswers || isBusy}
            onClick={() => {
              resetTerminal();
              decrementQuestionIdx();
            }}
          />
        </Col>
        <QuestionCard
          question={currentQuestion}
          countedAnswers={showVoteCount && countedAnswers}
          highlightSolutions={highlightSolutions}
          isServer
          disabled
        >
          <>
            {receivedAnswersCounter && (
              <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                <div className="text-muted">
                  {receivedAnswersCounter} users have answered
                </div>
                <div>
                  {currentQuestion &&
                    currentQuestion.type &&
                    currentQuestion.type === "question" && (
                      <Button
                        size="sm"
                        outline={!highlightSolutions}
                        onClick={this.toggleHighlightSolutions}
                        className="mr-2"
                      >
                        <CheckAllIcon style={{ paddingBottom: "3px" }} />{" "}
                        {highlightSolutions ? "Hide" : "Show"} Solutions
                      </Button>
                    )}
                  <Button
                    size="sm"
                    outline={!showVoteCount}
                    onClick={this.toggleShowVoteCount}
                  >
                    <FormatListNumberedIcon style={{ paddingBottom: "3px" }} />{" "}
                    {showVoteCount ? "Hide" : "Show"} Results
                  </Button>
                </div>
              </div>
            )}
            <AskScreenContinueButtonContainer />
            {questionHasCodeSnippet && (
              <CodeExecutionArea
                showTerminal={showTerminal}
                onClickExecute={this.toggleShowTerminal}
              />
            )}
          </>
        </QuestionCard>
        <Col xs="2" className="align-self-center">
          <ChevronRight
            disabled={!hasNextQuestion || acceptingAnswers || isBusy}
            onClick={() => {
              resetTerminal();
              incrementQuestionIdx();
            }}
          />
        </Col>
      </Row>
    );
  }
}

export default AskScreen;
