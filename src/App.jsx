import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Container from "react-bootstrap/esm/Container";
import BooksTable from "./components/BooksTable";
import ButtonAddNew from "./components/ButtonAddNew";
import CardBook from "./components/CardBook";
import ButtonAddNewDigital from "./components/ButtonAddNewDigital";
import DigitalBooksTable from "./components/DigitalBooksTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Container>
        <Navigation />

        <Routes>
          {/* Ruta para la página principal con la tabla de libros físicos */}
          <Route
            path="/"
            element={
              <>
                <h1>Bookstore Legacy Shop - Administrative Section</h1>
                <h2>Books</h2>
                <BooksTable />
                <ButtonAddNew />
              </>
            }
          />

          {/* Ruta para la tabla de libros digitales */}
          <Route
            path="/digital-books"
            element={
              <>
                <h1>Digital Books</h1>
                <DigitalBooksTable />
                <ButtonAddNewDigital />
              </>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
