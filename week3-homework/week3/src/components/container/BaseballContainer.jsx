/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Input from "../baseball/Input";
import Message from "../baseball/Message";
import HistoryList from "../baseball/HistoryList";

function generateRandomNumber() {
  const digits = [];
  while (digits.length < 3) {
    const num = Math.floor(Math.random() * 10);
    if (!digits.includes(num)) digits.push(num);
  }
  return digits;
}

// 스타일 정의
const containerStyle = css`
  max-width: 480px;
  margin: 40px auto;
  padding: 24px;
  border-radius: 12px;
`;

const titleStyle = css`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 16px;
`;

const attemptStyle = css`
  text-align: center;
  font-size: 1rem;
  margin-bottom: 20px;
  color: #495057;
`;

function BaseballContainer() {
  const [answer, setAnswer] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [attempt, setAttempt] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setAnswer(generateRandomNumber());
  }, []);

  const resetGame = () => {
    setAnswer(generateRandomNumber());
    setInput("");
    setMessage("");
    setHistory([]);
    setAttempt(0);
    setIsGameOver(false);
  };

  const handleSubmit = () => {
    if (isGameOver) return;

    if (input.length !== 3 || new Set(input).size !== 3) {
      setMessage("⚠️ 3자리 중복되지 않는 숫자를 입력하세요.");
      return;
    }

    const inputDigits = input.split("").map(Number);
    let strike = 0;
    let ball = 0;

    inputDigits.forEach((num, idx) => {
      if (num === answer[idx]) strike++;
      else if (answer.includes(num)) ball++;
    });

    let result = "";
    if (strike === 3) {
      result = "🎉 3S - 승리!";
      setMessage(result);
      setHistory([{ input, result }, ...history]);
      setIsGameOver(true);
      setTimeout(resetGame, 2000);
      return;
    }

    if (attempt + 1 >= 10) {
      result = "❌ 10회 실패 - 게임 패배!";
      setIsGameOver(true);
      setTimeout(resetGame, 5000);
    } else if (strike === 0 && ball === 0) {
      result = "OUT";
    } else {
      result = `${ball}B${strike}S`;
    }

    setHistory([{ input, result }, ...history]);
    setMessage(result);
    setAttempt((prev) => prev + 1);
    setInput("");
  };

  return (
    <div css={containerStyle}>
      <h2 css={titleStyle}>⚾ 숫자 야구 게임</h2>
      <p css={attemptStyle}>시도 횟수: {attempt} / 10</p>
      <Input input={input} setInput={setInput} onSubmit={handleSubmit} />
      <Message text={message} />
      <HistoryList history={history} />
    </div>
  );
}

export default BaseballContainer;
