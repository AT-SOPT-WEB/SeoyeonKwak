import React, { useState } from "react";

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
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="3자리 숫자 입력"
      />
      <button onClick={onSubmit}>확인</button>
      {warning && <p style={{ color: "red" }}>{warning}</p>}
    </div>
  );
}

export default Input;
