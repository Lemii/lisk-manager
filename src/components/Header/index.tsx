import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header(): JSX.Element {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark accent mb-5">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="inherit-link">
            <FontAwesomeIcon icon="signal" className="text-success icon-mb " /> Lisk Manager
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/add" className="nav-link pointer">
                Add Node
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/settings" className="nav-link pointer">
                Settings
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/faq" className="nav-link pointer">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto text-light">by delegate lemii</div>
      </div>
    </nav>
  );
}
