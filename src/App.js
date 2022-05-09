import React, { useCallback, useEffect, useState } from "react";
import CardList from "./Components/card-list/card-list.component";
import "./App.css";
import SearchBox from "./Components/search-box/search-box.component";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredAllPokemon, setFilteredAllPokemon] = useState(allPokemon);

  const getPokemon = useCallback(async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`
    );

    const { results } = await response.json();
    // console.log(results);

    const responseArray = await Promise.all(
      results.map(async ({ url }) => {
        // console.log(url);

        const data = await fetch(url);
        // console.log(data);

        const pokemon = await data.json();
        // console.log(pokemon);

        return pokemon; // returns pokemon object
      })
    );

    setAllPokemon(responseArray);
  }, []);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };

  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  useEffect(() => {
    const newFilteredAllPokemon = allPokemon.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchField);
    });

    setFilteredAllPokemon(newFilteredAllPokemon);
  }, [allPokemon, searchField]);

  return (
    <div className="App">
      <SearchBox
        className="search-box"
        type="search"
        onChangeHandler={onSearchChange}
        placeholder="search pokemon"
      />
      <CardList pokeData={filteredAllPokemon} />
    </div>
  );
};

export default App;
