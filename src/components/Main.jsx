import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";

function Main({ clothingItems, handleCardClick, weatherData }) {
  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherData.type,
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <p className="main__text">
        Today is {weatherData.type} / You may want to wear:
      </p>

      <ul className="cards">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
