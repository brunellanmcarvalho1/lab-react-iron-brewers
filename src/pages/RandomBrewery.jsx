import { useState, useEffect } from "react";

function RandomBreweryPage() {
  const [randomBrewery, setRandomBrewery] = useState({});

  useEffect(() => {
    fetch(`https://api.openbrewerydb.org/v1/breweries/random`)
      .then((response) => response.json())
      .then((data) => setRandomBrewery(data))
      .catch((err) => console.log(err));
  }, []);

  if (!randomBrewery.name) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{randomBrewery.name}</h2>
      <p>Type: {randomBrewery.brewery_type}</p>
      <p>Country: {randomBrewery.country}</p>
      <p>website: {randomBrewery.website_url}</p>
    </div>
  );
}
export default RandomBreweryPage;
