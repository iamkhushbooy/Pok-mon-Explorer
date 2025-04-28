import React from "react";

const types = [
  "", "grass", "fire", "water", "bug", "normal", "poison", "electric",
  "ground", "fairy", "fighting", "psychic", "rock", "ghost", "ice", "dragon"
];

export default function TypeFilter({ setSelectedType }) {
  return (
    <select
      onChange={(e) => setSelectedType(e.target.value)}
      className="border p-2 rounded-md w-64"
    >
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
}
