import "./App.css";
import { Header } from "./components/Header";
import { SearchForm } from "./components/SearchForm";
import { Results } from "./components/Results";
import { Introduction } from "./components/Introduction";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <Introduction />
        <SearchForm />
      </div>
    </>
  );
}

export default App;
