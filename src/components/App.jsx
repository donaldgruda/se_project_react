import "../App.css";
import {
  getWeatherData,
  parseWeatherData,
  getWeatherCondition,
} from "../utils/weatherApi";
import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import { defaultClothingItems } from "../utils/clothingItems";

function App() {
  const [clothingItems] = useState(defaultClothingItems);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    city: "",
    type: "",
  });

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        const parsed = parseWeatherData(data);
        const type = getWeatherCondition(parsed.temperature);

        setWeatherData({
          temperature: parsed.temperature,
          city: parsed.city,
          type: type,
        });
      })
      .catch(console.error);
  }, []);

  function handleOpenAddModal() {
    setActiveModal("add-garment");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  return (
    <div className="page">
      <Header
        handleOpenAddModal={handleOpenAddModal}
        weatherData={weatherData}
      />

      <Main
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        weatherData={weatherData}
      />

      <Footer />

      <ModalWithForm
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
      />

      <ItemModal
        isOpen={activeModal === "preview"}
        card={selectedCard}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
