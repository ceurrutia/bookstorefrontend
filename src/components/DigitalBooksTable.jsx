import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function DigitalBooksTable() {
  const [digitalBooks, setDigitalBooks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDigitalBook, setEditDigitalBook] = useState({
    _id: '',
    title: '',
    author: '',
    publishYear: '',
    price: '',
    format: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDigitalBookId, setDeleteDigitalBookId] = useState('');

  // Cargar los libros digitales desde el backend
  const fetchDigitalBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/digitalbook');
      setDigitalBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching digital books:", error);
    }
  };

  // Cargar los libros digitales al cargar el componente
  useEffect(() => {
    fetchDigitalBooks();
  }, []);

  // Abrir modal para editar libro digital
  const handleEdit = (digitalBook) => {
    setEditDigitalBook(digitalBook);
    setShowEditModal(true);
  };

  // Guardar cambios después de editar
  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/digitalbook/${editDigitalBook._id}`, editDigitalBook); 
      setShowEditModal(false);
      fetchDigitalBooks(); // Actualizar lista de libros digitales
    } catch (error) {
      console.error("Error updating digital book:", error);
    }
  };

  // Abrir modal para confirmar eliminación
  const handleDelete = (digitalBookId) => {
    setDeleteDigitalBookId(digitalBookId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/digitalbook/${deleteDigitalBookId}`);
      setShowDeleteModal(false);
      fetchDigitalBooks(); // Actualizar lista de libros digitales
    } catch (error) {
      console.error("Error deleting digital book:", error);
    }
  };

  // Manejar cambios en la edición
  const handleEditChange = (e) => {
    setEditDigitalBook({
      ...editDigitalBook,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publish Year</th>
            <th>Price</th>
            <th>Format</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {digitalBooks.map((digitalBook, index) => (
            <tr key={digitalBook._id}>
              <td>{index + 1}</td>
              <td>{digitalBook.title}</td>
              <td>{digitalBook.author}</td>
              <td>{digitalBook.publishYear}</td>
              <td>{digitalBook.price}</td>
              <td>{digitalBook.format}</td>
              <td>
                <Button variant="secondary" onClick={() => handleEdit(digitalBook)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(digitalBook._id)}>Delete</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Digital Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={editDigitalBook.title} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group controlId="editAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" value={editDigitalBook.author} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group controlId="editPublishYear">
              <Form.Label>Publish Year</Form.Label>
              <Form.Control type="number" name="publishYear" value={editDigitalBook.publishYear} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group controlId="editPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={editDigitalBook.price} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group controlId="editFormat">
              <Form.Label>Format</Form.Label>
              <Form.Control type="text" name="format" value={editDigitalBook.format} onChange={handleEditChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this digital book? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DigitalBooksTable;
