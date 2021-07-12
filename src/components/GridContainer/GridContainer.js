import { useState } from "react";
import Grid from "../Grid/Grid";
import "./GridContainer.css";

const DEFAULT_GRID_SIZE = 10;
const DEFAULT_MOVE_LIMIT = 5;

function GridContainer() {
  const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE);
  const [moveLimit, setMoveLimit] = useState(DEFAULT_MOVE_LIMIT);
  const [gridSize2, setGridSize2] = useState(DEFAULT_GRID_SIZE);
  const [moveLimit2, setMoveLimit2] = useState(DEFAULT_MOVE_LIMIT);

  function handleChangeGridSize(e) {
    let value = e.target.value;

    if (value < 1) {
      value = 1;
    }

    setGridSize(value);
  }

  function handleChangeMoveLimit(e) {
    let value = e.target.value;

    if (value < 1) {
      value = 1;
    }

    setMoveLimit(value);
  }

  function handleSubmit() {
    setGridSize2(gridSize);
    setMoveLimit2(moveLimit);
  }

  return (
    <div className="grid-container">
      <div className="grid-form">
        <input
          type="number"
          min={1}
          max={100}
          value={gridSize}
          placeholder={DEFAULT_GRID_SIZE}
          onChange={handleChangeGridSize}
        />
        <input
          type="number"
          min={1}
          max={100}
          value={moveLimit}
          placeholder={DEFAULT_MOVE_LIMIT}
          onChange={handleChangeMoveLimit}
        />
        <button type="button" onClick={handleSubmit}>
          Click me
        </button>
      </div>
      <Grid gridSize={gridSize2} moveLimit={moveLimit2} />
    </div>
  );
}

export default GridContainer;
