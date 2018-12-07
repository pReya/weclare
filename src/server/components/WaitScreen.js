import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import SpinnerCard from "../../shared/components/SpinnerCard";
import DefaultCard from "../../shared/components/DefaultCard";

function WaitScreen(props) {
  const { connections, history } = props;
  const hasClients = connections.length > 0;

  return (
    <>
      {hasClients ? (
        <DefaultCard
          title="Start the quiz"
          text={`Currently there are ${
            connections.length
          } clients connected. Do you want to start the quiz?`}
        >
          <Button
            color="secondary"
            block
            onClick={() => {
              history.push("/server/ask");
            }}
          >
            Send Question
          </Button>
        </DefaultCard>
      ) : (
        <SpinnerCard title="Waiting for participants" />
      )}
    </>
  );
}

const mapStateToProps = state => ({
  status: state.connection.status,
  connections: state.server.connections
});

export default connect(mapStateToProps)(withRouter(WaitScreen));
