import avatar from "../../assets/avatar.svg";
import "./SideBar.css";
function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img className="sidebar__avatar" src={avatar} alt="User avatar" />
        <p className="sidebar__username">Terrence Tegene</p>
      </div>
    </div>
  );
}

export default SideBar;
