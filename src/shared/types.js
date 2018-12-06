import PropTypes from "prop-types";

export const TSpinnerCard = {
  title: PropTypes.string
};

export const DSpinnerCard = {
  title: "Waiting"
};

export const TQuestion = PropTypes.shape({
  question: PropTypes.shape({
    progress: PropTypes.string,
    questionIdx: PropTypes.number,
    questionText: PropTypes.string,
    questionType: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.object)
  })
});

export const DQuestion = {
  question: {
    progress: "",
    questionIdx: null,
    questionText: null,
    questionType: null,
    answers: null
  }
};
