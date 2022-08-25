import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ProductsContainer from "./Products/ProductsContainer";
import DiscountsContainer from "./Discounts/DiscountsContainer";
import ClientCards from "./Cards/ClientCards";

export default function Dashboard() {
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [price, setPrice] = React.useState(0);

  const calculateTotalPrice = () => {
    setError(null);
    const productIDs = selectedProducts.map((product) => product.id);
    console.log(
      productIDs,
      selectedCard,
      "http://localhost:7070/ventas/precio/" +
        selectedCard +
        "?productos=" +
        productIDs
    );
    fetch(
      "http://localhost:7070/ventas/precio/" +
        selectedCard +
        "?productos=" +
        productIDs
    )
      .then((response) => response.json())
      .then((data) => {
        setPrice(data.precio);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buy = () => {
    setError(null);
    setLoading(true);
    const productIDs = selectedProducts.map((product) => product.id);
    fetch(
      "http://localhost:7070/ventas?cliente=" + 17 + "&tarjeta=" + selectedCard,
      {
        method: "POST",
        body: JSON.stringify(productIDs),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleProductSelect = (product) => {
    setError(null);
    const newSelectedProducts = [...selectedProducts];
    const index = newSelectedProducts.findIndex(
        (selectedProduct) => selectedProduct.id === product.id
      ),
      isSelected = index !== -1;
    if (isSelected) {
      newSelectedProducts.splice(index, 1);
    } else {
      newSelectedProducts.push(product);
    }
    setSelectedProducts(newSelectedProducts);
  };

  const handleCardSelect = (card) => {
    setError(null);
    setSelectedCard(card);
  };

  return (
    <Box>
      <ProductsContainer onSelectProduct={handleProductSelect} />
      <DiscountsContainer />
      <ClientCards onSelectCard={handleCardSelect} />

      <Box>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Total: {price} $
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            calculateTotalPrice();
          }}
          disabled={selectedProducts.length === 0 || selectedCard === null}
        >
          Calculate
        </Button>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          buy();
        }}
        disabled={selectedProducts.length === 0 || selectedCard === null}
      >
        Buy
      </Button>
    </Box>
  );
}
