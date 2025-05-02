/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import closeIcon from "../../assets/ic-close.svg";

const listWrapperStyle = css`
  margin-top: 20px;

  h3 {
    margin-bottom: 8px;
  }

  ul {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  li {
    display: flex;
    align-items: center;
    gap: 4px;
    background-color: #f1f3f5;
    padding: 8px 20px;
    border-radius: 8px;
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }
`;

function RecentSearchList({ searches, onSelect, onDelete }) {
  if (searches.length === 0) return null;

  return (
    <div css={listWrapperStyle}>
      <h3>최근 검색어</h3>
      <ul>
        {searches.map((id) => (
          <li key={id}>
            <span onClick={() => onSelect(id)}>{id}</span>
            <button onClick={() => onDelete(id)}>
              <img src={closeIcon} alt="닫기" width="16" height="16" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentSearchList;
