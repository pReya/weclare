import React from "react";
import InformationIcon from "mdi-react/InformationIcon";
import { UncontrolledPopover, PopoverBody } from "reactstrap";

function InfoPopoverIcon(props) {
  const { id, text, placement } = props;

  return (
    <>
      <InformationIcon
        style={{ marginRight: "10px" }}
        size={20}
        color="#8a817c"
        id={id}
      />
      <UncontrolledPopover placement={placement} target={id} trigger="hover">
        <PopoverBody>{text}</PopoverBody>
      </UncontrolledPopover>
    </>
  );
}

export default InfoPopoverIcon;
