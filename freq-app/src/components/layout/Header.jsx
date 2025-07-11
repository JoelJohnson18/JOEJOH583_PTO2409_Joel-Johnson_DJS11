import "./Header.css";
// Import the Link component to enable client-side navigation //
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">
          <img src="/Freq-image.jpg" alt="Logo" />
        </Link>
      </div>

      <div className="slogan">All your favorite voices, in one Freq.</div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
}
