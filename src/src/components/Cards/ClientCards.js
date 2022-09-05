import React from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";
import ClientsService from "../../services/ClientsService";

export default function ClientCards({ handleResult, handleCardSelect }) {
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const clientsService = new ClientsService();

  React.useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    setLoading(true);
    setCards([]);
    handleResult(null);

    clientsService
      .fetchCards(1)
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => {
        handleResult(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    handleCardSelect(event.target.value);
  };

  const renderCards = () => {
    return (
      cards &&
      cards.map((card) => (
        <FormControlLabel
          key={card.id}
          value={card.id}
          control={<Radio />}
          label={card.metodo + " - " + card.codigo}
          onChange={handleChange}
        />
      ))
    );
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Cards
      </Typography>
      <FormControl>
        <FormLabel>Select a card as a payment method</FormLabel>
        <RadioGroup>{renderCards()}</RadioGroup>
      </FormControl>
    </React.Fragment>
  );
}
