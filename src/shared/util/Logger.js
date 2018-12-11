class Logger {
  static info(msg, ...data) {
    Logger.emitMessage("info", msg, data);
  }

  static error(msg, ...data) {
    Logger.emitMessage("error", msg, data);
  }

  static warn(msg, ...data) {
    Logger.emitMessage("warn", msg, data);
  }

  static debug(msg, ...data) {
    Logger.emitMessage("debug", msg, data);
  }

  static emitMessage(msgType, msg, data) {
    if (data.length > 0) {
      console[msgType](msg, data);
    } else {
      console[msgType](msg);
    }
  }
}

export default Logger;
