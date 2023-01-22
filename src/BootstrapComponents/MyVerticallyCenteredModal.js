import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRef } from "react";

function MyVerticallyCenteredModal(props) {

  const teamNameRef = useRef();
  const githubOwnerUsernameRef = useRef();
  const repositoryNameRef = useRef();

  const onSubmitHandler = (event)=>{
    event.preventDefault();
    const userSubmission = {teamName:teamNameRef.current.value, githubOwnerUsername: githubOwnerUsernameRef.current.value, repositoryName: repositoryNameRef.current.value}
    props.onSubmit(userSubmission);
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Team</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmitHandler}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Team Name</Form.Label>
            <Form.Control type="text" ref={teamNameRef} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>GitHub Owner Username</Form.Label>
            <Form.Control type="text" ref={githubOwnerUsernameRef} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Repository Name</Form.Label>
            <Form.Control type="text" ref={repositoryNameRef} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={props.onHide}>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
