import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Container from "react-bootstrap/esm/Container";
import BooksTable from "./components/BooksTable";
import ButtonAddNew from "./components/ButtonAddNew";
import CardBook from "./components/CardBook";


function App() {
  return (
    <>
      <Container>
        <Navigation />

        <h1>Bookstore Legacy Shop - Administrative Section </h1>

        
        <BooksTable />
        <ButtonAddNew /> 
       

      </Container>
    </>
  );
}

export default App;
