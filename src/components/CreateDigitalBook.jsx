import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function CreateDigitalBook({ reloadBooks }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [price, setPrice] = useState("");
  const [format, setFormat] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/digitalbook", {
        title,
        author,
        publishYear,
        price,
        format
      });
      console.log("Book created:", response.data);
      setShowAlert(true);
      reloadBooks();
      setTitle("");
      setAuthor("");
      setPublishYear("");
      setPrice("");
      setFormat("");
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPublishYear">
          <Form.Label>Publish Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter publish year"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Format</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>

      {/* Alerta de éxito, ver dismissible ahi*/}
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          The digital book was created successfully!
        </Alert>
      )}
    </>
  );
}

export default CreateDigitalBook;

