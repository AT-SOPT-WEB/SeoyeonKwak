/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const searchContainerStyle = css`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const buttonStyle = css`
  width: 5rem;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
    transition: background-color 0.3s ease;
  }
`;

const inputStyle = css`
  width: 40rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  font-size: 1rem;
`;

const Search = ({ searchContent, handleSearchChange, handleSearch }) => {
  return (
    <div css={searchContainerStyle}>
      <input
        type="text"
        css={inputStyle}
        value={searchContent}
        placeholder="검색 내용을 입력해보세요"
        onChange={handleSearchChange}
      />
      <button css={buttonStyle} onClick={handleSearch}>
        검색
      </button>
    </div>
  );
};
export default Search;
