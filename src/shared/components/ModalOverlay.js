import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const { children } = this.props;
    const { showModal } = this.state;

    return (
      <>
        {React.cloneElement(React.Children.only(children), {
          onClick: this.toggleModal
        })}
        <Modal isOpen={showModal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default ModalOverlay;
