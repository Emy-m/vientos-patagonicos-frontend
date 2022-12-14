export default class ClientsService {
  fetchCards = async (idClient) => {
    return fetch("http://localhost:7070/clientes/tarjetas/" + idClient)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw error;
          });
        }
        return response.json();
      })
      .then((data) => Promise.resolve(data.tarjetas))
      .catch((error) => {
        return Promise.reject(error);
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
