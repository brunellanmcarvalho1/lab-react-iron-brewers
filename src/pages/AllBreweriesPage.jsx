import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllBreweriesPage() {
  const [breweries, setBreweries] = useState([]);
  const [search, setSearch] = useState(""); // Estado para armazenar o texto da busca

  useEffect(() => {
    // Verifica se há algo para buscar
    if (search.trim() === "") {
      // Caso contrário, busca todos
      fetch(`https://api.openbrewerydb.org/v1/breweries`)
        .then((response) => response.json())
        .then((data) => setBreweries(data))
        .catch((err) => console.log(err));
    } else {
      // Faz uma busca na API sempre que o texto de busca mudar
      fetch(`https://api.openbrewerydb.org/v1/breweries/search?query=${search}`)
        .then((response) => response.json())
        .then((data) => setBreweries(data))
        .catch((err) => console.log(err));
    }
  }, [search]); // Usa o 'search' como uma dependência do useEffect

  if (breweries.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search breweries"
      />
      {breweries.map((brewery) => (
        <div key={brewery.id}>
          <h2>{brewery.name}</h2>
          <p>Type: {brewery.brewery_type}</p>
          <p>Country: {brewery.country}</p>
          <p>website: {brewery.website_url}</p>
          <Link to={`/breweries/${brewery.id}`}>
            <button>Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
export default AllBreweriesPage;
