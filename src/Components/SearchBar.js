import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() === "") return;
    onSearch(query);
    setQuery("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city, zip, or landmark..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
