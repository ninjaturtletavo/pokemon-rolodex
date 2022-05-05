import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      allPokemon: [],
      searchField: "",
    };
  }

  componentDidMount() {
    const fetchPokemon = () => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=5&offset=0")
        .then((response) => response.json())
        .then((allPokemon) => {
          allPokemon.results.forEach((pokemon) => {
            fetchPokemonData(pokemon);
          });
        });
    };

    const fetchPokemonData = (pokemon) => {
      let url = pokemon.url;
      console.log(url);
      fetch(url)
        .then((response) => response.json())
        .then((pokeData) =>
          this.setState(
            () => {
              return { allPokemon: [pokeData] };
            },
            () => {
              console.log(this.state);
            }
          )
        );
    };

    fetchPokemon();
  }

  render() {
    const { allPokemon, searchField } = this.state;

    const filteredPokemon = allPokemon.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="search pokemon"
          onChange={(event) => {
            console.log(event.target.value);
            const searchField = event.target.value.toLowerCase();

            this.setState(() => {
              return { searchField };
            });
          }}
        />
        ;
        {filteredPokemon.map((pokeData) => {
          return (
            <div key={pokeData.id}>
              <h1>{pokeData.name}</h1>
              <img src={pokeData.sprites.front_default} alt="pokemon" />
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
