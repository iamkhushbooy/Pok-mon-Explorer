"use client";

import { useState, useEffect } from "react";
import PokemonCard from '@/components/ PokemonCard'
import SearchBar from '@/components/  SearchBar'
import TypeFilter from "@/components/TypeFilter";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
      } catch (err) {
        setError("Failed to fetch Pokémon data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons;

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  if (loading) return <h2 className="text-center text-2xl mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-500 mt-10">{error}</h2>;

  return (
    <div className="p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Pokemon Explorer</h1>
      </header>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter setSelectedType={setSelectedType} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <h3 className="col-span-full text-center text-gray-500">No Pokémon found</h3>
        )}
      </div>
    </div>
  );
}
