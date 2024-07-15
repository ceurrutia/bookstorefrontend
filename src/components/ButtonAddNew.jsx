import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CreateBook from './CreateBook'; 

const ButtonAddNew = ({ reloadBooks }) => {
  const [showModal, setShowModal] = useState(false); 

  const handleClose = () => setShowModal(false); 
  const handleShow = () => setShowModal(true); 

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add New Book
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBook reloadBooks={reloadBooks} /> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ButtonAddNew;
