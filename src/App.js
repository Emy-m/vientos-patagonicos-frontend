import "./App.css";
import AddClientForm from "./src/components/Clients/AddClientForm";
import ShowClientsTable from "./src/components/Clients/ShowClientsTable";

function App() {
  return (
    <div className="App">
      <AddClientForm />
      <ShowClientsTable />
    </div>
  );
}

export default App;
