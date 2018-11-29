import React from "react";
import { Row } from "reactstrap";
import DefaultCard from "../../shared/components/DefaultCard";

const Waiter = () => (
  <Row className="justify-content-center">
    <DefaultCard title="Waiting for participants" text="Your ID: xyz" />
  </Row>
);

export default Waiter;
