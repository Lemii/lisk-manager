import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PasswordContext } from '../../contexts';

export default function Header(): JSX.Element {
  const { password, update } = useContext(PasswordContext);

  const handleSignout = () => {
    if (update) {
      update(null);
    }
  };

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
            <li className="nav-item">
              <Link to="/settings" className="nav-link pointer">
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/docs" className="nav-link pointer">
                Docs
              </Link>
            </li>
            <li className="nav-item">
              {password ? (
                <div onClick={handleSignout} className="nav-link pointer">
                  <FontAwesomeIcon icon="sign-out-alt" />
                </div>
              ) : (
                <Link to="/auth" className="nav-link pointer">
                  <FontAwesomeIcon icon="sign-in-alt" />
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className="ml-auto text-light">by delegate lemii</div>
      </div>
    </nav>
  );
}
