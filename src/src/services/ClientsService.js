export default class ClientsService {
  fetchCards = async (idClient) => {
    return fetch("http://localhost:7070/clientes/tarjetas/" + idClient)
      .then((response) => response.json())
      .then((data) => data.tarjetas)
      .catch((error) => {
        throw error;
      });
  };

  fetchClients = async () => {
    return fetch("http://localhost:7070/clientes")
      .then((response) => response.json())
      .then((data) => Promise.resolve(data.clientes))
      .catch((error) => Promise.reject(error));
  };

  addClient = async (client) => {
    return fetch("http://localhost:7070/clientes", {
      method: "POST",
      body: JSON.stringify(client),
    })
      .then((res) => res.json())
      .then((data) => Promise.resolve(data))
      .catch((error) => Promise.reject(error));
  };
}
