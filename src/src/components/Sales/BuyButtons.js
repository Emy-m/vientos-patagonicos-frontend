import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function BuyButtons(props) {
  const setResult = props.setResult;
  const [loading, setLoading] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const selectedProducts = props.selectedProducts;
  const selectedCard = props.selectedCard;

  const calculateTotalPrice = () => {
    setResult(null);
    setLoading(true);
    const productIDs = selectedProducts.map((product) => product.id);

    fetch(
      "http://localhost:7070/ventas/precio?idTarjeta=" +
        selectedCard +
        "&productos=" +
        JSON.stringify(
          productIDs.map((id) => {
            return { id: id };
          })
        )
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
    const productIDs = selectedProducts.map((product) => product.id);
    fetch(
      "http://localhost:7070/ventas?cliente=" +
        17 +
        "&tarjeta=" +
        selectedCard +
        "&productos=" +
        productIDs,
      {
        method: "POST",
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
      <Box>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Total: {price} $
        </Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            calculateTotalPrice();
          }}
        >
          Calculate
        </Button>
      </Box>
      <Box>
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
