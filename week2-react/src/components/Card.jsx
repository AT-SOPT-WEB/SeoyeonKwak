// Card.jsx

import style from "./Card.module.css";

const Card = ({ name, github, englishName }) => {
  return (
    <div className={style.card}>
      <h2>{name}</h2>
      <p>깃허브: {github}</p>
      <p>영어 이름: {englishName}</p>
    </div>
  );
};

export default Card;
