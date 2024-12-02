import logo from './logo.svg';
import './App.css';
import SearchPage from './SearchPage';

function App() {
  return (
    <div className="App">
    <SearchPage />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
