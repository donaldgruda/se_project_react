function WeatherCard({ weatherData }) {
  return (
    <section className="weather">
      <p className="weather__temp">{weatherData.temperature}°F</p>
    </section>
  );
}

export default WeatherCard;
