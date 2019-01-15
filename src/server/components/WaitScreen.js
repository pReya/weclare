import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Row } from "reactstrap";
import SpinnerCard from "../../shared/components/SpinnerCard";
import DefaultCard from "../../shared/components/DefaultCard";

function WaitScreen(props) {
  const { connections, history } = props;
  const hasClients = connections.length > 0;
  const pluralizeClient = connections.length === 1 ? "client" : "clients";
  const pluralizeVerb = connections.length === 1 ? "is" : "are";

  return (
    <Row className="justify-content-center">
      {hasClients ? (
        <DefaultCard
          title="Start the quiz"
          text={`Currently there ${pluralizeVerb} ${
            connections.length
          } ${pluralizeClient} connected. You can choose to wait for more participants or just go ahead and start the quiz.`}
        >
          <Button
            color="secondary"
            block
            onClick={() => {
              history.push("/server/ask");
            }}
          >
            Start Quiz
          </Button>
        </DefaultCard>
      ) : (
        <SpinnerCard title="Waiting for participants" />
      )}
    </Row>
  );
}

const mapStateToProps = state => ({
  status: state.connection.status,
  connections: state.server.connections
});

export default connect(mapStateToProps)(withRouter(WaitScreen));
