import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function BuyButtons(props) {
  const setResult = props.setResult;
  const [loading, setLoading] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const selectedProducts = props.selectedProducts.map((product) => product.id);
  const selectedCard = props.selectedCard;

  const calculateTotalPrice = () => {
    setResult(null);
    setLoading(true);

    fetch(
      "http://localhost:7070/ventas/precio?tarjeta=" +
        selectedCard +
        "&productos=" +
        JSON.stringify(selectedProducts)
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "error") {
          return Promise.reject(data);
        }
        setPrice(data.precio);
        setLoading(false);
      })
      .catch((error) => {
        setResult(error);
        setLoading(false);
      });
  };

  const buy = () => {
    setResult(null);
    setLoading(true);
    fetch(
      "http://localhost:7070/ventas?cliente=" + 1 + "&tarjeta=" + selectedCard,
      {
        method: "POST",
        body: JSON.stringify(selectedProducts),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setResult(data);
      })
      .catch((error) => {
        setResult(error);
        setLoading(false);
      });
  };

  return (
    <Box>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Total: {price} $
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            calculateTotalPrice();
          }}
        >
          Calculate
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            buy();
          }}
        >
          Buy
        </Button>
      </Box>
    </Box>
  );
}
