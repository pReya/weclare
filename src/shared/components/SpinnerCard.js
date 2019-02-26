import React from "react";
import { Helmet } from "react-helmet";
import MDSpinner from "react-md-spinner";
import DefaultCard from "./DefaultCard";
import { TSpinnerCard, DSpinnerCard } from "../types";

const SpinnerCard = props => {
  const { title, size, text } = props;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <DefaultCard title={title}>
        <div className="d-flex flex-column justify-content-center">
          <div style={{ textAlign: "center" }}>
            <MDSpinner
              color1="#8a817c"
              color2="#f44336"
              color3="#dc9125"
              color4="#5fa15d"
              size={size}
            />
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
