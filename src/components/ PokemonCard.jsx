import React from "react";

export default function PokemonCard({ pokemon }) {
  return (
    <div className="bg-gray-100 shadow-md rounded-md p-4 flex flex-col items-center">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20" />
      <h3 className="text-lg font-bold mt-2 text-black">{pokemon.name.toUpperCase()}</h3>
      <p className="text-sm text-gray-500">ID: {pokemon.id}</p>
      <div className="flex gap-2 mt-2 flex-wrap justify-center">
        {pokemon.types.map((typeObj) => (
          <span
            key={typeObj.slot}
            className="px-2 py-1 bg-blue-300 rounded-full text-xs capitalize"
          >
            {typeObj.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
