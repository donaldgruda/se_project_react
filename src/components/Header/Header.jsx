import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";
import "./Header.css";
function Header({ handleOpenAddModal, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </Link>
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={handleOpenAddModal}
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__profile-link">
          <p className="header__name">Terrence Tegene</p>

          <img className="header__avatar" src={avatar} alt="User avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
