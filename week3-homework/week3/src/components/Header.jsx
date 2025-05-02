/** @jsxImportSource @emotion/react */
import React from "react";

import { css } from "@emotion/react";

const headerStyle = css`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: #282c34;
  color: white;
  padding: 16px 0;
  text-align: center;
`;

const navStyle = css`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

function Header({ activeTab, onTabChange }) {
  return (
    <header css={headerStyle}>
      <h1>숫자 야구 || 깃허브 검색</h1>
      <nav css={navStyle}>
        <button
          onClick={() => onTabChange("github")}
          disabled={activeTab === "github"}
        >
          깃허브 검색
        </button>
        <button
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
