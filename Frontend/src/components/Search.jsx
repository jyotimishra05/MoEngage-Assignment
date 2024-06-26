import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const[loading , setLoading]=useState(false);

   const handleSearch = async () => {
        
     try {
       setLoading(true);
       const response = await axios.get(
         `http://localhost:3001/search?by_city=${query}`
       );
       console.log(response.data); 
       setLoading(false)
       setResults(response.data);
     } catch (error) {
      setLoading(false)
       console.error("Error searching breweries", error);
     }
   };
console.log(results);
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Search Breweries
        </h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full border-2 border-gray-200 p-2 rounded-lg"
            placeholder="Search by City"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
        {loading ? <p className="font-bold text-blue-600 p-2">Loading...</p> :
        <div className="mt-6">
          {results.map((brewery) => (
            <div key={brewery.id} className="border-b border-gray-200 py-4">
              <Link
                to={`/breweries/${brewery.id}`}
                className="text-blue-500 hover:underline"
              >
                {brewery.name}
              </Link>
              <p>
                {brewery.street}, {brewery.city}, {brewery.state}
              </p>
              <p>{brewery.phone}</p>
              <a
                href={brewery.website_url}
                className="text-blue-500 hover:underline"
              >
                {brewery.website_url}
              </a>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default Search;
