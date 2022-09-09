export default class ProductsService {
  fetchProducts = async () => {
    return fetch("http://localhost:7070/productos")
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw error;
          });
        }
        return response.json();
      })
      .then((data) => {
        Promise.resolve(data.productos);
      })
      .catch((error) => Promise.reject(error));
  };

  fetchCategories = async () => {
    return fetch("http://localhost:7070/categorias")
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw error;
          });
        }
        return response.json();
      })
      .then((data) => Promise.resolve(data.categorias))
      .catch((error) => Promise.reject(error));
  };

  saveProduct = async (product, id = null) => {
    let pathParams = "";
    let method = "POST";

    if (id) {
      pathParams = "/" + id;
      method = "PUT";
    }

    return fetch("http://localhost:7070/productos" + pathParams, {
      method: method,
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw error;
          });
        }
        return response.json();
      })
      .then((data) => Promise.resolve(data))
      .catch((error) => Promise.reject(error));
  };
}
