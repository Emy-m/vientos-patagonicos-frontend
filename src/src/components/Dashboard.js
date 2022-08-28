import React from "react";
import { Container } from "@mui/material";
import ProductsContainer from "./Products/ProductsContainer";
import DiscountsContainer from "./Discounts/DiscountsContainer";
import ClientCards from "./Cards/ClientCards";
import BuyButtons from "./Sales/BuyButtons";
import ResponseMessage from "./ResponseMessage";

export default function Dashboard() {
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [result, setResult] = React.useState(null);

  const handleProductSelect = (product) => {
    setResult(null);
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
    setSelectedCard(card);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <ProductsContainer
        onSelectProduct={handleProductSelect}
        setResult={setResult}
      />
      <DiscountsContainer setResult={setResult} />
      <ClientCards onSelectCard={handleCardSelect} setResult={setResult} />
      <BuyButtons
        selectedCard={selectedCard}
        selectedProducts={selectedProducts}
        setResult={setResult}
      />
      <ResponseMessage result={result} />
    </Container>
  );
}
