export default class ClientsService {
  fetchCards = (client) => {
    let data = null;

    fetch("http://localhost:7070/clientes/tarjetas/" + client)
      .then((response) => response.json())
      .then((_data) => {
        data = _data;
      })
      .catch((error) => {});

    return data;
  };

  fetchClients = () => {
    let data = null;

    fetch("http://localhost:7070/clientes")
      .then((response) => response.json())
      .then((_data) => {
        data = _data;
      })
      .catch((error) => {});

    return data;
  };

  addClient = (client) => {
    fetch("http://localhost:7070/clientes", {
      method: "POST",
      body: JSON.stringify(client),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
}
