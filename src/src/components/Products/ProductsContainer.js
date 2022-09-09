import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function ProductsContainer({
  onSelectProduct,
  handleProductEdit,
  setResult,
}) {
  const [products, setProducts] = React.useState([]);
  const [checked, setChecked] = React.useState([0]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    setResult(null);
    setChecked([0]);

    fetch("http://localhost:7070/productos")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.productos);
        setLoading(false);
      })
      .catch((error) => {
        setResult(error);
        setLoading(false);
      });
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
    onSelectProduct(products.find((product) => product.id === productID));
  };

  const renderProducts = () => {
    return (
      products &&
      products.map((product) => (
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
          <IconButton
            component="label"
            onClick={() => handleProductEdit(product)}
          >
            <EditIcon />
          </IconButton>
        </ListItem>
      ))
    );
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
