import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function BooksTable() {
  const [books, setBooks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBook, setEditBook] = useState({
    _id: '',
    title: '',
    author: '',
    publishYear: '',
    price: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState('');

  // Cargar los libros desde el backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://bookstorebackend-phi.vercel.app/books');
      setBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Cargar los libros al cargar el componente
  useEffect(() => {
    fetchBooks();
  }, []);

  // Abrir modal para editar libro
  const handleEdit = (book) => {
    setEditBook(book);
    setShowEditModal(true);
  };

  // Guardar cambios después de editar
  const handleEditSubmit = async () => {
    try {
      await axios.put(`https://bookstorebackend-phi.vercel.app/books${editBook._id}`, editBook);
      setShowEditModal(false);
      fetchBooks(); // Actualizar lista de libros no funcina, revisar
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Abrir modal para confirmar eliminación
  const handleDelete = (bookId) => {
    setDeleteBookId(bookId);
    setShowDeleteModal(true);
  };

  // Confirmar eliminación de libro
  const confirmDelete = async () => {
    try {
      await axios.delete(`https://bookstorebackend-phi.vercel.app/books/${deleteBookId}`);
      setShowDeleteModal(false);
      fetchBooks(); // Actualizar lista de libros
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Manejar cambios en la edición
  const handleEditChange = (e) => {
    setEditBook({
      ...editBook,
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishYear}</td>
              <td>{book.price}</td>
              <td>
                <Button variant="secondary" onClick={() => handleEdit(book)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(book._id)}>Delete</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={editBook.title} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group controlId="editAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" value={editBook.author} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group controlId="editPublishYear">
              <Form.Label>Publish Year</Form.Label>
              <Form.Control type="number" name="publishYear" value={editBook.publishYear} onChange={handleEditChange} />
            </Form.Group>
            <Form.Group controlId="editPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={editBook.price} onChange={handleEditChange} />
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
          Are you sure you want to delete this book? This action can not be undone
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

export default BooksTable;
