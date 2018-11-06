import React from "react";
import "../scss/App.scss";
import {
  Form,
  FormGroup,
  Button,
  Input,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText
} from "reactstrap";
import PropTypes from "prop-types";

class ConnectForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { onChangeServerId } = this.props;
    onChangeServerId(e.target.value);
  }

  render() {
    const { status, serverId, onClickConnect } = this.props;
    return (
      <Card className="shadow">
        <CardHeader>
          <h4 className="my-0">Connect to Server</h4>
        </CardHeader>
        <CardBody>
          <CardText>Please enter a valid Server ID to connect to.</CardText>
          <Form>
            <FormGroup row>
              <Col md={4}>
                <Input
                  id="serverId"
                  type="text"
                  value={serverId}
                  onChange={this.handleChange}
                  disabled={status === 2}
                />
              </Col>
              <Col md={4}>
                <Button
                  type="button"
                  id="connect"
                  onClick={onClickConnect}
                  disabled={status === 2}
                >
                  Connect
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

ConnectForm.propTypes = {
  onChangeServerId: PropTypes.func.isRequired,
  onClickConnect: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired,
  serverId: PropTypes.string.isRequired
};

export default ConnectForm;
