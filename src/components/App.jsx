import DeleteConfirmationModal from "./DeleteConfirmationModal/DeleteConfirmationModal";
import AddItemModal from "./AddItemModal/AddItemModal";
import { getItems, addItem, deleteItem } from "../utils/api";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
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
import ItemModal from "./ItemModal";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    temperature: { F: 0, C: 0 },
    city: "",
    type: "",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

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
        const parsedWeather = parseWeatherData(data);
        const type = getWeatherCondition(parsedWeather.temperature.F);

        setWeatherData({
          temperature: parsedWeather.temperature,
          city: parsedWeather.city,
          type,
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

  function handleOpenDeleteModal() {
    setActiveModal("delete-confirm");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleAddGarmentSubmit(item) {
    addItem(item)
      .then((savedItem) => {
        setClothingItems((prevItems) => [savedItem, ...prevItems]);
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleDeleteCard() {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id),
        );
        setSelectedCard({});
        handleCloseModal();
      })
      .catch(console.error);
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <Header
          handleOpenAddModal={handleOpenAddModal}
          weatherData={weatherData}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                weatherData={weatherData}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                handleOpenAddModal={handleOpenAddModal}
              />
            }
          />
        </Routes>

        <Footer />

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={handleCloseModal}
          onAddItem={handleAddGarmentSubmit}
        />

        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={handleCloseModal}
          onDeleteClick={handleOpenDeleteModal}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirm"}
          onClose={handleCloseModal}
          onConfirm={handleDeleteCard}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
