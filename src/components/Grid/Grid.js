import * as React from "react";
import { useGridState } from "../GridContainer/GridContainer";
import "./Grid.css";

function useKeyDownListener(handler) {
  const handlerRef = React.useRef();

  // This way we avoid passing the handler to the 'listener' useEffect deps array,
  // this ensures that we don't create duplicate event listeners.
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

function Grid() {
  const [{ gridSize, moveLimit, moveHistory, activeCell }, dispatch] =
    useGridState();
  const [focused, setFocused] = React.useState(true);

  React.useEffect(() => {
    setFocused(true);
  }, [gridSize, moveLimit]);

  useKeyDownListener(handleMoveActiveCell);

  function handleMoveActiveCell({ key }) {
    let { row, col } = activeCell;

    // We shouldn't be able to move through the grid if we used up our move limit
    // or if the grid is not focused.
    if (!focused || moveHistory.length >= moveLimit) {
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

    dispatch({ type: "MOVE_ACTIVE_CELL", activeCell: { row, col } });
  }

  function getCellColorClass(rowIdx, colIdx) {
    let color = "";

    if (activeCell.row === rowIdx && activeCell.col === colIdx) {
      color = "active";
    } else if ((rowIdx + colIdx) % 2 === 0) {
      color = "white";
    } else {
      color = "black";
    }

    return `cell--${color}`;
  }

  function handleGridFocus() {
    setFocused(true);
  }

  function handleGridBlur() {
    setFocused(false);
  }

  return (
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
              className={`cell ${getCellColorClass(rowIdx, colIdx)}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
