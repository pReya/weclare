import PropTypes from "prop-types";

export const TSpinnerCard = {
  title: PropTypes.string,
  size: PropTypes.number
};

export const DSpinnerCard = {
  title: "Waiting",
  size: 30
};

export const TQuestion = PropTypes.shape({
  question: PropTypes.shape({
    progress: PropTypes.string,
    questionIdx: PropTypes.number,
    text: PropTypes.string,
    type: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.object)
  })
});

export const DQuestion = {
  question: {
    progress: "",
    questionIdx: null,
    text: null,
    type: null,
    answers: null
  },
  disabled: false,
  selectedAnswerIdx: null
};