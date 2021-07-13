import { useGridState } from "../GridContainer/GridContainer";
import "./MoveList.css";

function MoveList() {
  const [{ moveHistory, moveLimit }] = useGridState();

  return (
    <div className="move-table--container">
      <table className="move-table">
        <thead className="move-table--head">
          <tr>
            <th className="move-table--header-cell">Row</th>
            <th className="move-table--header-cell">Column</th>
          </tr>
        </thead>
        {moveLimit === moveHistory.length && (
          <tbody>
            {moveHistory.map(({ row, col }, id) => (
              <tr key={id}>
                <td className="move-table--cell">{row}</td>
                <td className="move-table--cell">{col}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default MoveList;
