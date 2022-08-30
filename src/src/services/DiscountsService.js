export default class DiscountsService {
  fetchDiscounts = () => {
    let data = null;

    fetch("http://localhost:7070/descuentos")
      .then((response) => response.json())
      .then((_data) => {
        data = _data;
      })
      .catch((error) => {});

    return data;
  };
}
