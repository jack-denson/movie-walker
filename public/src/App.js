import './App.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <header className="appHeader">
        <div className="appHeaderInner">
          <span className="logoMark" aria-hidden="true">🎬</span>
          <div className="logoText">
            <span className="logoTitle">MovieWalker</span>
            <span className="logoTagline">The daily movie-connection game</span>
          </div>
        </div>
      </header>
      <main className="appMain">
        <Game />
      </main>
      <footer className="appFooter">
        <p>By <a href="https://jdenson.com">Jack Denson</a>, 2023</p>
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </footer>
    </div>
  );
}

export default App;
