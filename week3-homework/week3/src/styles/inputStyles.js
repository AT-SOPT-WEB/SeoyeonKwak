import { css } from "@emotion/react";

export const MAIN_COLOR = "#4DFF94";

export const inputWrapperStyle = css`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const inputStyle = css`
  padding: 12px 20px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: max-content;
  text-align: center;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${MAIN_COLOR};
  }
`;

export const buttonStyle = css`
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  background-color: ${MAIN_COLOR};
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #36e07d;
  }
`;
