import React from "react";
import { Stack } from "@mui/system";
import Discount from "./Discount";
import { Typography } from "@mui/material";

export default function DiscountsContainer(props) {
  const [discounts, setDiscounts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const setResult = props.setResult;

  React.useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = () => {
    setLoading(true);
    setResult(null);

    fetch("http://localhost:7070/descuentos")
      .then((response) => response.json())
      .then((data) => {
        setDiscounts(data.descuentos);
        setLoading(false);
      })
      .catch((error) => {
        setResult(error);
        setLoading(false);
      });
  };

  const renderDiscounts = () => {
    return discounts.map((discount) => (
      <Discount key={discount.id} discount={discount} />
    ));
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Discounts
      </Typography>
      <Stack spacing={2}>
        {discounts && discounts.length > 0 ? (
          renderDiscounts()
        ) : (
          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.6)",
              fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
            }}
          >
            There is no discounts available
          </Typography>
        )}
      </Stack>
    </React.Fragment>
  );
}
