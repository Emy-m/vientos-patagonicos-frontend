import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";

function ShowClientsTable() {
  const [clients, setClients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:7070/clientes")
      .then((response) => response.json())
      .then((data) => {
        setClients(data.clientes);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Clients
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Firstname</TableCell>
            <TableCell>Lastname</TableCell>
            <TableCell>DNI</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.nombre}</TableCell>
              <TableCell>{client.apellido}</TableCell>
              <TableCell>{client.dni}</TableCell>
              <TableCell>{client.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="primary"
        onClick={() => fetchClients()}
        disabled={loading}
      >
        Refresh
      </Button>
    </React.Fragment>
  );
}

export default ShowClientsTable;
