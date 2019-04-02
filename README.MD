## What is Weclare?

Weclare is an acronym for "**we**b based **cla**ssroom **re**sponse system".  

It is the prototype(!) of a classroom response system specifically designed for the use in computer science education at the university level. 

Weclare was designed to fulfill these high-level requirements:

- **Web based**: No downloads necessary for both, students and instructor (using [Create React App](https://github.com/facebook/create-react-app) and [Redux](https://github.com/reduxjs/redux))
- **Peer-2-Peer**: Minimal (only for signalling) server interaction required (based on WebRTC using [PeerJS](https://github.com/peers/peerjs))
- **Code Execution**: Java code snippets within questions can be compiled and executed right in the browser (using [Doppio](https://github.com/plasma-umass/doppio/))
- **Code Formatting**: Formatting options (indentation, syntax highlighting) for Java code snippets (using [react-quill](https://github.com/zenoamaro/react-quill) and [react-codemirror2](https://github.com/scniro/react-codemirror2))

## What is a classroom response system?

A classroom response system (CRS) is a special case of an "Audience Response System" directed towards classroom use in universities or schools. It allows an instructor to direct questions at the audience (students), which they can then interactively answer. CRS can exist as dedicated hardware systems (think of little remote boxes with buttons on them). But nowadays CRS are mostly software systems that can be used with many devices like computers, tablets or smartphones.

## What is the motivation behind the creation of Weclare?

Weclare is the result of a bachelor thesis by Moritz Stückler at HAW Hamburg. It is heavily inspired by an existing system called ["StuReSy" made by another student at the University of Hamburg](https://github.com/sturesy).

However today, StuReSy seems unnecessarily complicated. It needs a dedicated server component and a Java Client to be configured when creating questions. Also it lacks a lot of computer science specific features (formatting source code fragments, syntax highlighting, etc).
