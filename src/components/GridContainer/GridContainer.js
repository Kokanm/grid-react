import * as React from "react";
import Grid from "../Grid/Grid";
import GridForm, {
  DEFAULT_GRID_SIZE,
  DEFAULT_MOVE_LIMIT,
} from "../GridForm/GridForm";
import MoveList from "../MoveList/MoveList";
import "./GridContainer.css";

const GridContext = React.createContext();

const initialState = {
  gridSize: DEFAULT_GRID_SIZE,
  moveLimit: DEFAULT_MOVE_LIMIT,
  moveHistory: [{ row: 0, col: 0 }],
  activeCell: { row: 0, col: 0 },
};

function gridReducer(state = initialState, action) {
  switch (action.type) {
    case "MOVE_ACTIVE_CELL": {
      return {
        ...state,
        activeCell: action.activeCell,
        moveHistory: [...state.moveHistory, action.activeCell],
      };
    }
    case "UPDATE_GRID": {
      return {
        ...initialState,
        gridSize: action.gridSize,
        moveLimit: action.moveLimit,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function useGridState() {
  const context = React.useContext(GridContext);

  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }

  return context;
}

function GridContainer() {
  const [state, dispatch] = React.useReducer(gridReducer, { ...initialState });

  return (
    <GridContext.Provider value={[state, dispatch]}>
      <div className="grid-container">
        <GridForm />
        <div className="grid-and-moves">
          <Grid />
          <MoveList />
        </div>
      </div>
    </GridContext.Provider>
  );
}

export default GridContainer;
