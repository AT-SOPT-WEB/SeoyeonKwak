/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

const headerStyle = css`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: #282c34;
  color: white;
  padding: 30px 0;
  text-align: center;

  h1 {
    font-size: 1.5rem;
  }
`;

const navStyle = css`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const buttonStyle = (isActive) => css`
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: semibold;
  background-color: ${isActive ? "#4DFF94" : "transparent"};
  color: ${isActive ? "#000" : "#fff"};
  border: 1px solid ${isActive ? "#4DFF94" : "#fff"};
  border-radius: 24px;
  cursor: ${isActive ? "default" : "pointer"};
  transition: 0.3s;
`;

function Header({ activeTab, onTabChange }) {
  return (
    <header css={headerStyle}>
      <h1>숫자 야구 || 깃허브 검색</h1>
      <nav css={navStyle}>
        <button
          css={buttonStyle(activeTab === "github")}
          onClick={() => onTabChange("github")}
          disabled={activeTab === "github"}
        >
          깃허브 검색
        </button>

        <button
          css={buttonStyle(activeTab === "baseball")}
          onClick={() => onTabChange("baseball")}
          disabled={activeTab === "baseball"}
        >
          숫자야구 게임
        </button>
      </nav>
    </header>
  );
}

export default Header;
