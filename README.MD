## What is Weclare?

Weclare is an acronym for "**we**b based **cla**ssroom **re**sponse system".

It is a classroom response system which was specifically design for the use in computer science education at the university level.

Weclare was designed to fulfill these high-level requirements:

- Web based (no downloads necessary)
- Interactive code execution of Java code snippets in the browser
- Peer-to-Peer design: No or minimal (only for signalling) server required
- Good formatting options for code snippets

## What is a classroom response system?

A CRS can be used in class settings. It allows a instructor to direct questions at the audience (students), which they can then interactively answer. CRS also exist as hardware systems (think of little remote boxes with buttons on them). Nowadays CRS are mostly software systems that can be used with computers, tablets or smartphones.

## What is the motivation behind the creation of Weclare?

Weclare is the result of a bachelor thesis by Moritz Stückler at HAW Hamburg. It is heavily inspired by an existing system called ["StuReSy" made by another student at the University of Hamburg](https://github.com/sturesy).

However today, StuReSy seems unnecessarily complicated. It needs a dedicated PHP server component and a Java Client to be configured. Also it lacks a lot of computer science specific features (formatting source code fragments, syntax highlighting, etc).

Weclare is supposed to offer the same basic functionality as StuReSy but without the need for offline software or a server component. It is a peer-to-peer system and especially designed for computer science use cases.
