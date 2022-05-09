import "./card.styles.css";

const Card = ({ pokemon }) => {
  const { id, name, sprites } = pokemon;
  console.log(name);

  return (
    <div className="card-container" key={id}>
      <h1>{name}</h1>
      <img src={sprites.front_default} alt="pokemon" />
    </div>
  );
};

export default Card;
