import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import determineConnectedSinks from "../grid-solve/connected_sinks";

const GridTable = ({ grid, setGrid }) => {
  const [solution, setSolution] = useState(null);
  const symbols = {
    horizontal: "═",
    vertical: "║",
    upsideL: "╔",
    mirroredUpsideL: "╗",
    lConnect: "╚",
    mirroredL: "╝",
    rightsideT: "╠",
    leftsideT: "╣",
    teesideT: "╦",
    upsideT: "╩",
    allConnect: "*",
  };

  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (!selected) {
      return;
    }

    function handleKeyPress(event) {
      let key = event?.key;
      if (key && /^[A-Za-z/*]$/.test(key)) {
        const newGrid = grid.map((r, i) =>
          r.map((cell, j) =>
            i === selected.row && j === selected.col ? key.toUpperCase() : cell
          )
        );
        setGrid(newGrid);
      } else if (key && key === "Backspace") {
        const newGrid = grid.map((r, i) =>
          r.map((cell, j) =>
            i === selected.row && j === selected.col ? " " : cell
          )
        );
        setGrid(newGrid);
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selected]);

  useEffect(() => {
    setSelected(null);
    setSolution(null);
  }, [grid]);

  const handleCellClick = (row, col) => {
    setSelected({ row, col });
  };

  const handleSymbolClick = (symbol) => {
    if (selected) {
      const newGrid = grid.map((r, i) =>
        r.map((cell, j) =>
          i === selected.row && j === selected.col ? symbol : cell
        )
      );
      setGrid(newGrid);
    }
  };

  const solveGrid = () => {
    const reversedGrid = [...grid].reverse();
    setSolution(determineConnectedSinks(reversedGrid));
  };

  const generateSampleGrid = () => {
    const sampleGrid = [
      ["C", "╩", "╩", "╠", "╦"],
      ["╔", "╗", "╗", "*", "║"],
      ["║", "╠", "╣", "═", "║"],
      ["║", "╚", "╩", "B", "║"],
      ["*", "║", "A", "║", "D"],
    ];
    setGrid(sampleGrid);
  };

  return (
    <>
      <h2>Construct a Network of Connected Sources and Sinks on the Grid</h2>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="row" key={"grid_row_" + rowIndex}>
            {row.map((cell, colIndex) => {
              const isSelected =
                selected?.row === rowIndex && selected?.col === colIndex;
              return (
                <div
                  tabIndex={colIndex}
                  key={"grid_cell_" + rowIndex + "_" + colIndex}
                  className={`cell ${isSelected ? "selected" : ""}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  role="button"
                >
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="buttons">
        {Object.entries(symbols).map(([key, icon]) => (
          <button key={key} onClick={() => handleSymbolClick(icon)}>
            {icon}
          </button>
        ))}
      </div>
      <button
        onClick={generateSampleGrid}
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "darkgreen",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Generate Sample Grid
      </button>
      <button
        style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => solveGrid()}
      >
        Solve
      </button>
      {solution !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-md text-lg">
          <br></br>
          {solution.length > 0 ? (
            <>
              <strong>
                The following sink(s), in alphabetical order, are connected to
                the source(s):
              </strong>{" "}
              {solution}
            </>
          ) : (
            <strong>No sink(s) are connected to the source(s).</strong>
          )}
        </div>
      )}
    </>
  );
};

GridTable.propTypes = {
  grid: PropTypes.array.isRequired,
  setGrid: PropTypes.func.isRequired,
};

export default GridTable;
