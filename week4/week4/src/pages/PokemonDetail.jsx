import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const PokemonDetail = () => {
  const { pokeName } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        );

        const name = res.data.name;
        const image = res.data.sprites.front_default;
        const types = res.data.types;

        setData({ name, image, types });
      } catch (error) {
        console.error("포켓몬 리스트를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Link to="/">뒤로가기</Link>
      <h1>{pokeName}</h1>
      <p>포켓몬 이름: {data?.name}</p>
      <p>포켓몬 타입:</p>
      <ul>
        {data?.types?.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
      <img src={data?.image} alt={data?.name} />
    </div>
  );
};
export default PokemonDetail;
