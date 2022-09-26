import React from "react";
import { Typography, ListItemText, ListItem } from "@mui/material";
import SellingsService from "../../services/SellingsService";

export default function LastSales({ handleResult }) {
  const [sales, setSales] = React.useState([]);
  const sellingsService = new SellingsService();

  React.useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = () => {
    sellingsService
      .getLastSells({ id: 1 })
      .then((data) => setSales(data))
      .catch((error) => handleResult(error));
  };

  const renderSells = () => {
    return (
      sales &&
      sales.map((sale) => (
        <ListItem key={sale.id}>
          <ListItemText primary={sale.codigo} secondary={sale.precio} />
        </ListItem>
      ))
    );
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Last Sales
      </Typography>
      {sales && sales.length > 0 ? renderSells() : "No hay ventas"}
    </React.Fragment>
  );
}
