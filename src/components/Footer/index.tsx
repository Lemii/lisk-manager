import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer(): JSX.Element {
  return (
    <footer className="text-center text-light mt-5">
      <hr className="border border-dark" />v{process.env.REACT_APP_VERSION} |{' '}
      <a href="https://github.com/lemii/lisk-manager" target="_blank" rel="noopener noreferrer">
        Source Code <FontAwesomeIcon icon="external-link-alt" />
      </a>{' '}
      |{' '}
      {Notification.permission === 'granted' ? (
        <span>
          <FontAwesomeIcon icon="bell" /> Enabled
        </span>
      ) : (
        <span className="text-muted">
          <FontAwesomeIcon icon="bell-slash" /> Disabled
        </span>
      )}
    </footer>
  );
}
