import Card from "../card/card.component";
import "./card-list.styles.css";

const CardList = ({ pokeData }) => (
  <div className="card-list">
    {pokeData.map((pokemon) => {
      const { id } = pokemon;
      // console.log(pokemon);

      return <Card key={id} pokemon={pokemon} />;
    })}
  </div>
);

export default CardList;
