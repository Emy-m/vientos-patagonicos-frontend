import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProductsService from "../../services/ProductsService";

const theme = createTheme();

export default function ProductForm({ product, handleResult }) {
  const [category, setCategory] = React.useState(
    product ? product.categoria.idCategoria : null
  );
  const [categories, setCategories] = React.useState([]);
  const productService = new ProductsService();

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    productService
      .fetchCategories()
      .then((cats) => {
        setCategories(cats);
      })
      .catch((err) => {
        handleResult(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    productService
      .saveProduct(
        {
          codigo: data.get("codigo"),
          descripcion: data.get("descripcion"),
          precio: data.get("precio"),
          marca: data.get("marca"),
          categoria: category,
          version: product.version,
        },
        product?.id
      )
      .then((res) => {
        handleResult(res);
      });
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value.idCategoria);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {product ? "Edit Product" : "Add Product"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {product ? (
                  <TextField
                    name="id"
                    required
                    fullWidth
                    id="id"
                    label="ID"
                    autoFocus
                    defaultValue={product?.id}
                    disabled
                  />
                ) : null}
              </Grid>
              <Grid item xs={12}>
                {product ? (
                  <TextField
                    name="codigo"
                    required
                    fullWidth
                    id="codigo"
                    label="Code"
                    autoFocus
                    defaultValue={product?.codigo}
                  />
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="descripcion"
                  required
                  fullWidth
                  id="descripcion"
                  label="Description"
                  autoFocus
                  defaultValue={product?.descripcion}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="marca"
                  label="Brand"
                  name="marca"
                  defaultValue={product?.marca}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="precio"
                  label="Precio"
                  name="precio"
                  type="number"
                  defaultValue={product?.precio}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    labelId="category"
                    id="category-select"
                    defaultValue={
                      categories && product ? product.categoria.idCategoria : ""
                    }
                    label="Category"
                    onChange={handleChangeCategory}
                  >
                    {categories &&
                      categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.nombre}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
