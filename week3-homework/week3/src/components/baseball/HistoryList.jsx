import React from "react";

function HistoryList({ history }) {
  return (
    <ul>
      {history.map((item, index) => (
        <li key={index}>
          입력: {item.input} → 결과: {item.result}
        </li>
      ))}
    </ul>
  );
}

export default HistoryList;
