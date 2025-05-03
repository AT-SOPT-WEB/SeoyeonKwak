import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <h1>포켓몬 도감</h1>
      <Link to="/pokemon/피카츄">피카츄</Link>
      <Link to="/pokemon/이상해씨">이상해씨</Link>
    </div>
  );
};

export default Home;
