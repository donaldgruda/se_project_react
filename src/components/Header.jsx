import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";
function Header({ handleOpenAddModal, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img className="header__logo" src={logo} alt="WTWR logo" />

        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__right">
        <button
          className="header__add-btn"
          type="button"
          onClick={handleOpenAddModal}
        >
          + Add clothes
        </button>

        <p className="header__name">Terrence Tegene</p>

        <img className="header__avatar" src={avatar} alt="User avatar" />
      </div>
    </header>
  );
}

export default Header;
