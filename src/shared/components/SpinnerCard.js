import React from "react";
import { Helmet } from "react-helmet";
import { Spinner } from "reactstrap";
import DefaultCard from "./DefaultCard";
import { TSpinnerCard, DSpinnerCard } from "../types";

const SpinnerCard = props => {
  const { title, text } = props;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <DefaultCard title={title}>
        <div className="d-flex flex-column justify-content-center">
          <div style={{ textAlign: "center" }}>
            <Spinner size="lg" />
          </div>
          {text && (
            <div
              style={{
                textAlign: "center"
              }}
              className="mt-4 text-muted"
            >
              {text}
            </div>
          )}
        </div>
      </DefaultCard>
    </>
  );
};

SpinnerCard.propTypes = TSpinnerCard;
SpinnerCard.defaultProps = DSpinnerCard;

export default SpinnerCard;
