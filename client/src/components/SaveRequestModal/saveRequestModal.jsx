import React, { useState } from "react";
import { handleSaveToPC } from "../../utils/common";
import { Modal, Button, Form } from "react-bootstrap";
import "./saveModal.scss";
import PropTypes from 'prop-types';


export default function SaveRequestModal(props) {
  const [collectionName, setCollectionName] = useState("");

  const handleClose = () => {};

  const saveRequest = () => {
    const obj = {
      url: props.url,
      request: props.request,
    };
    handleSaveToPC(collectionName, obj);
  };

  const changeCollectionName = (evt) => {
    setCollectionName(evt.target.value);
  };

  return (
    <>
      <Modal.Header closeButton className="save-modal-header">
        <Modal.Title>SAVE REQUEST</Modal.Title>
      </Modal.Header>
      <Modal.Body className="save-modal-body">
        <Form.Group controlId="formBasicRequest">
          <p className="title-header">
            Requests are saved in collections (a group of requests).
          </p>
          <Form.Label>Request Name</Form.Label>
          <Form.Control
            value={props.url}
            type="text"
            placeholder="Enter Your Request Url Here.."
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Request description (Optional)</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
        <Form.Group controlId="formRequestNameCollection">
          <Form.Label>Name Your Collection</Form.Label>
          <Form.Control
            value={collectionName}
            type="text"
            onChange={changeCollectionName}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="save-modal-footer">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={saveRequest}>
          Save To PC
        </Button>
      </Modal.Footer>
    </>
  );
}

SaveRequestModal.defaultProps = {
  url: '',
  request: {}
}


SaveRequestModal.propTypes = {
  url: PropTypes.string,
  request: PropTypes.object
}