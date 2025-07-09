import './Header.css';
// Import the Link component to enable client-side navigation //
import { Link } from 'react-router-dom'; 

export default function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">
          <img src="/web-app-manifest-512x512.png" alt="Logo" />
        </Link>
      </div>

      <div className="slogan">
        Raise the Frequency of Your Thinking!
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
}
