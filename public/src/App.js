import './App.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          MovieWalker
        </p>
      </header>
      <div>
        <Game />
      </div>
      <footer>
        <p> By <a href="https://jdenson.com"> Jack Denson </a>, 2023</p>
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </footer>
    </div>
  );
}

export default App;
