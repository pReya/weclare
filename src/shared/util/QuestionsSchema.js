const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://www.weclare.de/questions.json",
  type: "array",
  title: "A question set for weclare.de",
  items: {
    type: "object",
    title: "A single question",
    required: ["id", "type", "text", "answers", "questionIdx"],
    properties: {
      id: {
        type: "string",
        title: "A unique id"
      },
      type: {
        type: "string",
        title: "Type of question (e.g. single, multi, text)"
      },
      questionIdx: {
        type: "number",
        title: "Question Index"
      },
      mode: {
        type: "string",
        title: "Mode of question (e.g. a vote or question)"
      },
      text: {
        type: "string",
        title: "The question text"
      },
      code: {
        type: "string",
        title: "Executable code for this question"
      },
      answers: {
        type: "array",
        title: "All answer options for this question",
        items: {
          type: "object",
          title: "A single answer",
          required: ["id", "text", "isCorrect"],
          properties: {
            id: {
              type: "string",
              title: "A unique id"
            },
            text: {
              type: "string",
              title: "The text of the answer"
            },
            isCorrect: {
              type: "boolean",
              title: "Flag if the answer is correct"
            }
          },
          additionalProperties: false
        }
      }
    },
    additionalProperties: false
  }
};

export default schema;
