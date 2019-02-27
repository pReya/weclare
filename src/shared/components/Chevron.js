import React from "react";
import ChevronRightIcon from "mdi-react/ChevronRightIcon";
import ChevronLeftIcon from "mdi-react/ChevronLeftIcon";

export const ChevronLeft = props => {
  const { onClick, disabled } = props;
  return (
    <div
      className="text-right align-middle"
      onClick={disabled ? null : onClick}
    >
      <ChevronLeftIcon
        className={`chevron ${disabled ? "disabled" : "enabled"}`}
        size={42}
      />
    </div>
  );
};

export const ChevronRight = props => {
  const { onClick, disabled } = props;
  return (
    <div className="text-left align-middle" onClick={disabled ? null : onClick}>
      <ChevronRightIcon
        className={`chevron ${disabled ? "disabled" : "enabled"}`}
        size={42}
      />
    </div>
  );
};
