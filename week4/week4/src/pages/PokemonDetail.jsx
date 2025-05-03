import { Link, useParams } from "react-router";

const PokemonDetail = () => {
  const { pokeName } = useParams();
  return (
    <div>
      <Link to="/">뒤로가기</Link>
      <h1>{pokeName}</h1>
      <p>상세정보....</p>
    </div>
  );
};
export default PokemonDetail;
