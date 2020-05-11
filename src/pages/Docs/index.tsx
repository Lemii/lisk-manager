import React, { useEffect } from 'react';

export default function Docs(): JSX.Element {
  useEffect(() => {
    document.title = 'Docs | Lisk Manager';
  }, []);

  return (
    <div className="container text-light">
      <h5 className="mb-4">Docs</h5>
      <p>
        Documentation is available on the project's{' '}
        <a
          href="https://github.com/Lemii/lisk-manager/tree/master/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          repository
        </a>
        .
      </p>

      <p>Quick reference:</p>
      <ul>
        <li>
          <a
            href="https://github.com/Lemii/lisk-manager/blob/master/docs/faq.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Frequently Asked Questions
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Lemii/lisk-manager/blob/master/docs/node-configuration.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            How To Configure a Node
          </a>
        </li>
      </ul>
    </div>
  );
}
