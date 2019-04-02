import { addLine } from "./terminal";
import { toggleBusy } from "./server";

const Doppio = require("doppiojvm");
const BrowserFS = require("browserfs");

const writeJavaSourceFileAsync = async (name, source) =>
  new Promise((resolve, reject) => {
    const { fs } = window;

    fs.writeFile(`/tmp/${name}.java`, source, err => {
      if (err) reject(err);
      resolve();
    });
  });

const setupBrowserFs = async () => {
  BrowserFS.install(window);
  await new Promise((resolve, reject) => {
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
          reject(e);
        }
        // Otherwise, BrowserFS is ready-to-use!
        window.fs = window.require("fs");
        resolve();
      }
    );
  });
};

// Doppio JS Actions
export const RUN_CURRENT_CODE = "RUN_CURRENT_CODE";
export function runCurrentCode() {
  return async (dispatch, getState) => {
    const {
      questionEditor: questions,
      server: { currentQuestionIdx }
    } = getState();

    const currentQuestion = questions[currentQuestionIdx];

    if (currentQuestion.code) {
      dispatch(toggleBusy());
      await setupBrowserFs();
      const { fs, process } = window;
      await writeJavaSourceFileAsync("App", currentQuestion.code);
      //   fs.readdir("/tmp", (err, files) => {
      //     // handling error
      //     if (err) {
      //       return console.log("Unable to scan directory: " + err);
      //     }
      //     // listing all files using forEach
      //     files.forEach(file => {
      //       // Do whatever you want to do with the file
      //       console.log(file);
      //     });
      //   });
      //   process.initializeTTYs();

      // Only attach listeners once
      if (process.stdout.listenerCount("data") === 0) {
        process.stdout.on("data", data =>
          dispatch(addLine(data.toString(), false))
        );
        process.stderr.on("data", data =>
          dispatch(addLine(data.toString(), false))
        );
      }

      dispatch(addLine("Starting JVM..."));
      // Instantiate Doppio JVM
      // eslint-disable-next-line
      new Doppio.VM.JVM(
        {
          doppioHomePath: "/sys",
          classpath: [".", "/sys/", "/home/", "/tmp/"]
        },
        (err, jvmObject) => {
          jvmObject.runClass("Loader", [], exitCode => {
            if (exitCode === 0) {
              dispatch(addLine("JVM exited successfully"));
            } else {
              dispatch(addLine("JVM exited with an error"));
            }
            dispatch(toggleBusy());
          });
        }
      );
    }
  };
}
