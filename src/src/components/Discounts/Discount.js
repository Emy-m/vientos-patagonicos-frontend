import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function Discount(props) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Active Discount
        </Typography>
        <Typography variant="body2">
          {Math.round(props.discount.descuento * 100)}% off
        </Typography>
        <Typography variant="div">
          {props.discount.marcaEnDescuento
            ? "Brand: " + props.discount.marcaEnDescuento
            : "Payment Method: " + props.discount.nombreMetodo}
        </Typography>
      </CardContent>
    </Card>
  );
}
