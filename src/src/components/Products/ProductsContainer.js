import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Typography,
} from "@mui/material";

export default function ProductsContainer(props) {
  const [products, setProducts] = React.useState([]);
  const [checked, setChecked] = React.useState([0]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    setChecked([0]);

    fetch("http://localhost:7070/productos")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.productos);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const renderProducts = () => {
    return products.map((product) => (
      <ListItem key={product.id}>
        <ListItemIcon>
          <Checkbox
            checked={checked.indexOf(product.id) !== -1}
            tabIndex={-1}
            onClick={handleToggle(product.id)}
          />
        </ListItemIcon>
        <ListItemText
          primary={product.descripcion + ": " + product.precio + "$"}
          secondary={product.marca + " - " + product.categoria.nombre}
        />
      </ListItem>
    ));
  };

  const handleToggle = (productID) => () => {
    const currentIndex = checked.indexOf(productID);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(productID);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.onSelectProduct(products.find((product) => product.id === productID));
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Products
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {renderProducts()}
      </List>
    </React.Fragment>
  );
}
