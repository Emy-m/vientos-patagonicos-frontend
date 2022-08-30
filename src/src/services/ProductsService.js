export default class ProductsService {
  fetchProducts = () => {
    let data = null;

    fetch("http://localhost:7070/productos")
      .then((response) => response.json())
      .then((_data) => {
        data = _data;
      })
      .catch((error) => {});

    return data;
  };
}
