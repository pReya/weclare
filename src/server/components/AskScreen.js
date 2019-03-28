import React from "react";
import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FormatListNumberedIcon from "mdi-react/FormatListNumberedIcon";
import CheckAllIcon from "mdi-react/CheckAllIcon";
// import Doppio from "doppiojvm/dist/release/doppio";
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

const BrowserFS = require("browserfs");
const Doppio = require("doppiojvm");

const writeJavaSourceFileAsync = async (name, source) =>
  new Promise((resolve, reject) => {
    const { fs } = window;

    fs.writeFile(`/tmp/${name}.java`, source, err => {
      if (err) reject(err);
      resolve();
    });
  });

class AskScreen extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      showVoteCount: false,
      highlightSolutions: false,
      prevQuestion: props.currentQuestion
    };
    this.state = this.initialState;
  }

  async componentDidUpdate() {
    const { fs, process } = window;
    const { currentQuestion } = this.props;

    if (currentQuestion.code) {
      await writeJavaSourceFileAsync("App", currentQuestion.code);
      fs.readdir("/tmp", (err, files) => {
        // handling error
        if (err) {
          return console.log("Unable to scan directory: " + err);
        }
        // listing all files using forEach
        files.forEach(file => {
          // Do whatever you want to do with the file
          console.log(file);
        });
      });
      process.initializeTTYs();
      const terminalDiv = document.getElementById("terminal");
      process.stdout.on("data", data => {
        const line = document.createTextNode(data.toString());
        terminalDiv.appendChild(line);
        terminalDiv.appendChild(document.createElement("br"));
      });
      process.stderr.on("data", data => {
        const line = document.createTextNode(data.toString());
        terminalDiv.appendChild(line);
        terminalDiv.appendChild(document.createElement("br"));
      });
      // eslint-disable-next-line
      new Doppio.VM.JVM(
        {
          // '/sys' is the path to a directory in the BrowserFS file system with:
          // * vendor/java_home/*
          doppioHomePath: "/sys",
          // Add the paths to your class and JAR files in the BrowserFS file system
          classpath: [".", "/sys/", "/home/", "/tmp/"]
        },
        (err, jvmObject) => {
          jvmObject.runClass("Loader", [], exitCode => {
            if (exitCode === 0) {
              // Execution terminated successfully
              const line = document.createTextNode("JVM exited successfully");
              terminalDiv.appendChild(line);
            } else {
              const line = document.createTextNode("JVM exited unsuccessfully");
              terminalDiv.appendChild(line);
            }
          });
        }
      );
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.currentQuestion &&
      props.currentQuestion.text !== state.prevQuestion.text
    ) {
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

  // startDoppio() {
  //   // Initialize TTYs; required if needed to be initialized immediately due to
  //   // circular dependency issue.
  //   // See: https://github.com/jvilk/bfs-process#stdinstdoutstderr
  //   process.initializeTTYs();
  //   process.stdout.on("data", data => {
  //     // data is a Node Buffer, which BrowserFS implements in the browser.
  //     // http://nodejs.org/api/buffer.html
  //     alert("Received the following output: " + data.toString());
  //   });

  //   // eslint-disable-next-line
  //   new Doppio.VM.JVM(
  //     {
  //       // '/sys' is the path to a directory in the BrowserFS file system with:
  //       // * vendor/java_home/*
  //       doppioHomePath: "/sys",
  //       // Add the paths to your class and JAR files in the BrowserFS file system
  //       classpath: [".", "/sys/", "/home/"]
  //     },
  //     (err, jvmObject) => {
  //       jvmObject.runClass("Javac", ["/home/App.java"], exitCode => {
  //         if (exitCode === 0) {
  //           // Execution terminated successfully
  //           console.log("SUCCESS");
  //           new Doppio.VM.JVM(
  //             {
  //               // '/sys' is the path to a directory in the BrowserFS file system with:
  //               // * vendor/java_home/*
  //               doppioHomePath: "/sys",
  //               // Add the paths to your class and JAR files in the BrowserFS file system
  //               classpath: [".", "/sys/", "/home/"]
  //             },
  //             (err, jvmObject) => {
  //               jvmObject.runClass("App", [], exitCode => {
  //                 if (exitCode === 0) {
  //                   // Execution terminated successfully
  //                   console.log("SUCCESS2");
  //                 } else {
  //                   console.log("ERROR2");
  //                   // Execution failed. :(
  //                 }
  //               });
  //             }
  //           );
  //         } else {
  //           console.log("ERROR");
  //           // Execution failed. :(
  //         }
  //       });
  //     }
  //   );
  // }

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
            <div
              style={{ height: "300px", overflow: "scroll" }}
              id="terminal"
              className="border rounded text-white bg-dark p-3 my-3"
            >
              Starting JVM...
              <br />
            </div>
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
      // An error happened!
      throw e;
    }
    // Otherwise, BrowserFS is ready-to-use!
    window.fs = window.require("fs");
  }
);

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
