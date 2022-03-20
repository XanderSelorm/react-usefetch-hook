import logo from './logo.svg';
import './App.css';
import useFetch from "./hooks/useFetch";

function App() {
  const { data, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1',
    (result) => console.log("Response: " + result.data.title)
  );

  if (error) {
    console.log("Error: " + error)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data ? data.title : "Unknown Data"}
        </p>
      </header>
    </div>
  );
}

export default App;
