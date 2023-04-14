import React, { useContext, useEffect } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import Header from "./component/Header";
import { Routes, Route } from "react-router-dom";
import AddEmployee from "./pages/AddEmployee";
import { Alert, AlertColor, CssBaseline } from "@mui/material";
import { NotificationContext } from "./context/NotificationContext";
import DeletedEmployees from "./pages/DeletedEmployees";
import Employees from "./pages/Employees";


const App: React.FC = () => {
  const { message, typeMessage, setMessage } = useContext(NotificationContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [message, setMessage]);

  return (
    <>
      <CssBaseline />
      <Header></Header>
      <Container maxWidth="xl" sx={{ mt: "100px" }}>
        {message && (
          <Alert severity={typeMessage as AlertColor} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/deleted" element={<DeletedEmployees />} />
          <Route path="/edit/:id" element={<AddEmployee />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
