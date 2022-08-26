import React from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

export default function ClientCards(props) {
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const setResult = props.setResult;
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = () => {
    setLoading(true);
    setResult(null);
    setValue("");
    setCards([]);
    fetch("http://localhost:7070/clientes/tarjetas/17")
      .then((response) => response.json())
      .then((data) => {
        setCards(data.tarjetas);
        setLoading(false);
      })
      .catch((error) => {
        setResult(error);
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onSelectCard(event.target.value);
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
    <FormControl>
      <FormLabel>Select a card as a payment method</FormLabel>
      <RadioGroup>{renderCards()}</RadioGroup>
    </FormControl>
  );
}
