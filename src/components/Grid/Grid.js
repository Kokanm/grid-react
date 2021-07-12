import * as React from "react";
import "./Grid.css";

function useKeyDownListener(handler) {
  const handlerRef = React.useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const eventListener = (event) => handlerRef.current(event);
    window.addEventListener("keydown", eventListener, false);

    return () => {
      window.removeEventListener("keydown", eventListener, false);
    };
  }, []);
}

function Grid({ gridSize, moveLimit }) {
  const [activeSquare, setActiveSquare] = React.useState({ row: 0, col: 0 });
  const [movesHistory, setMovesHistory] = React.useState([{ row: 0, col: 0 }]);
  const [focused, setFocused] = React.useState(true);

  React.useEffect(() => {
    setActiveSquare({ row: 0, col: 0 });
    setFocused(true);
  }, [gridSize, moveLimit]);

  useKeyDownListener(handleMoveActiveSquare);

  function handleMoveActiveSquare({ key }) {
    let { row, col } = activeSquare;

    if (!focused || movesHistory.length >= moveLimit) {
      return;
    }

    switch (key) {
      case "ArrowRight":
        col++;
        break;
      case "ArrowLeft":
        col--;
        break;
      case "ArrowUp":
        row--;
        break;
      case "ArrowDown":
        row++;
        break;
      default:
        return;
    }

    if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
      return;
    }

    setMovesHistory((prevMoves) => [...prevMoves, { row, col }]);
    setActiveSquare({ row, col });
  }

  function getSquareColorClass(rowIdx, colIdx) {
    let color = "";

    if (activeSquare.row === rowIdx && activeSquare.col === colIdx) {
      color = "yellow";
    } else if ((rowIdx + colIdx) % 2 === 0) {
      color = "white";
    } else {
      color = "black";
    }

    return `square--${color}`;
  }

  function handleGridFocus() {
    setFocused(true);
  }

  function handleGridBlur() {
    setFocused(false);
  }

  return (
    <React.Fragment>
      {movesHistory.length === moveLimit && (
        <div>{JSON.stringify(movesHistory)}</div>
      )}
      <div
        className="grid"
        tabIndex="0"
        onFocus={handleGridFocus}
        onBlur={handleGridBlur}
      >
        {Array.from({ length: gridSize }).map((row, rowIdx) => (
          <div className="row" key={rowIdx}>
            {Array.from({ length: gridSize }).map((col, colIdx) => (
              <div
                key={colIdx}
                className={`square ${getSquareColorClass(rowIdx, colIdx)}`}
              />
            ))}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Grid;
