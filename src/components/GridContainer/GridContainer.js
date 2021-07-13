import * as React from "react";
import Grid from "../Grid/Grid";
import GridForm, {
  DEFAULT_GRID_SIZE,
  DEFAULT_MOVE_LIMIT,
} from "../GridForm/GridForm";
import MoveList from "../MoveList/MoveList";
import "./GridContainer.css";

function GridContainer() {
  const [gridSize, setGridSize] = React.useState(DEFAULT_GRID_SIZE);
  const [moveLimit, setMoveLimit] = React.useState(DEFAULT_MOVE_LIMIT);
  const [moveHistory, setMoveHistory] = React.useState([{ row: 0, col: 0 }]);

  function updateGrid(size, limit) {
    setGridSize(size);
    setMoveLimit(limit);
  }

  return (
    <div className="grid-container">
      <GridForm updateGrid={updateGrid} />
      <div className="grid-and-moves">
        <Grid
          gridSize={gridSize}
          moveLimit={moveLimit}
          moveHistory={moveHistory}
          setMoveHistory={setMoveHistory}
        />
        <MoveList moveHistory={moveHistory} moveLimit={moveLimit} />
      </div>
    </div>
  );
}

export default GridContainer;
