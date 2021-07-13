import PropTypes from "prop-types";
import "./MoveList.css";

function MoveList({ moveHistory, moveLimit }) {
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
            {moveHistory.map(({ row, col }) => (
              <tr>
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

MoveList.propTypes = {
  moveLimit: PropTypes.number,
  moveHistory: PropTypes.exact({
    row: PropTypes.number,
    col: PropTypes.number,
  }).isRequired,
};

export default MoveList;
