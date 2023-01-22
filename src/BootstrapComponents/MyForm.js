import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import { useState } from "react";

function MyForm() {
  const teamNameRef = useRef();
  const githubOwnerUsernameRef = useRef();
  const repositoryNameRef = useRef();


  return (
    <Form>
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
    </Form>
  );
}

export default MyForm;
