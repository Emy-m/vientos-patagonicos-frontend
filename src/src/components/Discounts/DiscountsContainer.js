import React from "react";
import { Stack } from "@mui/system";
import Discount from "./Discount";
import { Typography } from "@mui/material";

export default function DiscountsContainer() {
  const [discounts, setDiscounts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:7070/descuentos")
      .then((response) => response.json())
      .then((data) => {
        setDiscounts(data.descuentos);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
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
      <Stack spacing={2}>{renderDiscounts()}</Stack>
    </React.Fragment>
  );
}
