import { useEffect } from "react";
import closeIcon from "../assets/close-icon.svg";
function ModalWithForm({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>

        <h2 className="modal__title">New garment</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Name
            <input className="modal__input" type="text" placeholder="Name" />
          </label>

          <label className="modal__label">
            Image
            <input
              className="modal__input"
              type="url"
              placeholder="Image URL"
            />
          </label>

          <fieldset className="modal__fieldset">
            <legend className="modal__legend">Select the weather type:</legend>

            <label className="modal__radio-label">
              <input type="radio" name="weather" value="hot" />
              Hot
            </label>

            <label className="modal__radio-label">
              <input type="radio" name="weather" value="warm" />
              Warm
            </label>

            <label className="modal__radio-label">
              <input type="radio" name="weather" value="cold" />
              Cold
            </label>
          </fieldset>

          <button className="modal__submit" type="submit">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
