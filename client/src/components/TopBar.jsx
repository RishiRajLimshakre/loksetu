import { Link } from "react-router-dom";
import "./TopBar.css";

const TopBar = () => {
  return (
    <header className="topbar">
      <Link to="/" className="topbar__brand">
        LokSetu
      </Link>
    </header>
  );
};

export default TopBar;
