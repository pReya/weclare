/* global BrowserFS */
import React from "react";
import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FormatListNumberedIcon from "mdi-react/FormatListNumberedIcon";
import CheckAllIcon from "mdi-react/CheckAllIcon";
import Doppio from "doppiojvm/dist/release/doppio";
import QuestionCard from "../../shared/components/QuestionCard";
import AskScreenContinueButtonContainer from "./AskScreenContinueButtonContainer";
import { getCurrentQuestion } from "../selectors/questions";
import {
  getAnswerCountForCurrentQuestion,
  getReceivedAnswersCounter
} from "../selectors/answers";
import { incrementQuestionIdx, decrementQuestionIdx } from "../actions/server";
import { ChevronRight, ChevronLeft } from "../../shared/components/Chevron";
import { hasPreviousQuestion, hasNextQuestion } from "../selectors/server";

class AskScreen extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      showVoteCount: false,
      highlightSolutions: false,
      prevQuestion: props.currentQuestion
    };
    this.state = this.initialState;

    BrowserFS.install(window);
    BrowserFS.configure(
      {
        fs: "MountableFileSystem",
        options: {
          "/tmp": { fs: "InMemory" },
          "/home": { fs: "LocalStorage" },
          "/sys": {
            fs: "XmlHttpRequest",
            options: {
              index: `${process.env.PUBLIC_URL}/doppio/listings.json`
            }
          }
        }
      },
      e => {
        if (e) {
          // An error occurred.
          throw e;
        }
        // Otherwise, BrowserFS is ready to use!
      }
    );

    // Grab BrowserFS's 'process' module, which emulates NodeJS's process.
    let process2 = BrowserFS.BFSRequire("process");

    // Initialize TTYs; required if needed to be initialized immediately due to
    // circular dependency issue.
    // See: https://github.com/jvilk/bfs-process#stdinstdoutstderr
    process2.initializeTTYs();
    process2.stdout.on("data", data => {
      // data is a Node Buffer, which BrowserFS implements in the browser.
      // http://nodejs.org/api/buffer.html
      alert("Received the following output: " + data.toString());
    });

    // eslint-disable-next-line
    new Doppio.VM.JVM(
      {
        // '/sys' is the path to a directory in the BrowserFS file system with:
        // * vendor/java_home/*
        doppioHomePath: "/sys",
        // Add the paths to your class and JAR files in the BrowserFS file system
        classpath: [".", "/sys/"]
      },
      (err, jvmObject) => {
        jvmObject.runClass("Javac", [], exitCode => {
          if (exitCode === 0) {
            // Execution terminated successfully
            console.log("SUCCESS");
          } else {
            console.log("ERROR");
            // Execution failed. :(
          }
        });
      }
    );
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.currentQuestion &&
      props.currentQuestion.text !== state.prevQuestion.text
    ) {
      console.log("Question has changed");
      return {
        prevQuestion: props.currentQuestion,
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
      acceptingAnswers
    } = this.props;
    const { showVoteCount, highlightSolutions } = this.state;

    return (
      <Row className="justify-content-center">
        <Col xs="2" className="align-self-center">
          <ChevronLeft
            disabled={!hasPreviousQuestion || acceptingAnswers}
            onClick={() => decrementQuestionIdx()}
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
                  {currentQuestion.type === "question" && (
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
          </>
        </QuestionCard>
        <Col xs="2" className="align-self-center">
          <ChevronRight
            disabled={!hasNextQuestion || acceptingAnswers}
            onClick={() => incrementQuestionIdx()}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  currentQuestion: getCurrentQuestion(state),
  countedAnswers: getAnswerCountForCurrentQuestion(state),
  receivedAnswersCounter: getReceivedAnswersCounter(state),
  hasPreviousQuestion: hasPreviousQuestion(state),
  hasNextQuestion: hasNextQuestion(state),
  acceptingAnswers: state.server.acceptingAnswers
});

const mapDispatchToProps = {
  incrementQuestionIdx,
  decrementQuestionIdx
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AskScreen));
