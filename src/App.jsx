import { useState } from "react";
import "./App.css";
import GridTable from "./components/grid-constructor/gridTable";

function App() {
  const [grid, setGrid] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(" "))
  );
  const [x, setX] = useState(3);
  const [y, setY] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGrid(
      Array(y)
        .fill(null)
        .map(() => Array(x).fill(" "))
    );
  };

  return (
    <div className="app">
      <form className="grid-input-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>
            X (columns):{""}
            <input
              type="number"
              value={x}
              min={1}
              onChange={(e) => setX(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="input-group">
          <label>
            Y (rows):{""}
            <input
              type="number"
              value={y}
              min={1}
              onChange={(e) => setY(Number(e.target.value))}
            />
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Generate Grid
        </button>
      </form>
      {<GridTable grid={grid} setGrid={setGrid} />}
    </div>
  );
}

export default App;
