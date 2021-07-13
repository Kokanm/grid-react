import "./GridForm.css";

export const DEFAULT_GRID_SIZE = 10;
export const DEFAULT_MOVE_LIMIT = 10;

function GridForm({ updateGrid }) {
  function handleSubmit(e) {
    e.preventDefault();

    const gridSize = Number(e.target.gridSize.value);
    const moveLimit = Number(e.target.moveLimit.value);
    updateGrid(gridSize, moveLimit);
  }

  return (
    <form className="grid-form" onSubmit={handleSubmit}>
      <div className="grid-form-input">
        <label htmlFor="gridSize">Grid Size</label>
        <input
          id="gridSize"
          type="number"
          min={1}
          max={100}
          defaultValue={DEFAULT_GRID_SIZE}
          placeholder={0}
        />
      </div>
      <div className="grid-form-input">
        <label htmlFor="moveLimit">Move Limit</label>
        <input
          id="moveLimit"
          type="number"
          min={1}
          max={100}
          defaultValue={DEFAULT_MOVE_LIMIT}
          placeholder={0}
        />
      </div>
      <button type="submit">Update Grid</button>
    </form>
  );
}

export default GridForm;
