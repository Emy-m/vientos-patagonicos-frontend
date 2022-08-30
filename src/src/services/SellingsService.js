export default class SellingsService {
  fetchTotalPrice = (card, products) => {
    let data = null;

    fetch(
      "http://localhost:7070/ventas/precio?tarjeta=" +
        card +
        "&productos=" +
        JSON.stringify(products)
    )
      .then((response) => response.json())
      .then((_data) => {
        if (_data.result === "error") {
          return Promise.reject(_data);
        }
        data = _data;
      })
      .catch((error) => {});

    return data;
  };

  addSelling = (client, card, products) => {
    fetch("http://localhost:7070/ventas?cliente=" + 1 + "&tarjeta=" + card, {
      method: "POST",
      body: JSON.stringify(products),
    })
      .then((response) => response.json())
      .then((_data) => {})
      .catch((error) => {});
  };
}
