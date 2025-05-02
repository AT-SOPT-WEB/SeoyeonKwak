/** @jsxImportSource @emotion/react */
import { useState } from "react";
import {
  buttonStyle,
  inputStyle,
  inputWrapperStyle,
} from "../../styles/inputStyles";

function Input({ input, setInput, onSubmit }) {
  const [warning, setWarning] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 3) {
      setWarning("⚠️ 3자리까지만 입력 가능합니다.");
    } else {
      setWarning("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <div>
      <div css={inputWrapperStyle}>
        <input
          type="text"
          value={input}
          css={inputStyle}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="3자리 숫자 입력"
        />
        <button css={buttonStyle} onClick={onSubmit}>
          확인
        </button>
      </div>
      {warning && <p style={{ color: "red" }}>{warning}</p>}
    </div>
  );
}

export default Input;
