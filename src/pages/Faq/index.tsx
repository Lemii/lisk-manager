import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import FaqElement from '../../components/FaqElement';

import { IFaqEntry } from '../../interfaces';

const entries: IFaqEntry[] = [
  {
    question: 'What do all these icons mean?',
    answer: (
      <div>
        <div className="mb-1">
          <FontAwesomeIcon icon="play-circle" className="text-success" /> Node is online, forging is
          enabled
        </div>
        <div className="mb-1">
          <FontAwesomeIcon icon="pause-circle" className="text-secondary" /> Node is online, forging
          is disabled (standby)
        </div>
        <div className="mb-1">
          <FontAwesomeIcon icon="question-circle" className="text-warning" /> Node is online,
          forging status could not be fetched
        </div>
        <div className="mb-1">
          <FontAwesomeIcon icon="stop-circle" className="text-danger" /> Node is unreachable
        </div>
      </div>
    )
  },

  {
    question: `The tool can't detect the Lisk Core version of my node.`,
    answer: (
      <div>
        This can be caused by multiple things.
        <ul>
          <li>Check if the protocol is correct (eg: http:// instead of https://)</li>
          <li>Check if the IP address is correct</li>
          <li>
            Check if the port number is correct (eg: 8000 for mainnet, 7000 for testnet, no port
            number for SSL domains)
          </li>
          <li>
            <strong>
              Non-secure node addresses do not work on websites with a secure https:// domain.
            </strong>{' '}
            <br />
            <br />
            This is caused by browsers blocking so called <i>mixed content</i>. Read more about it{' '}
            <a
              href="https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
            <br />
            <br />
            To avoid the blocking of mixed content, run the tool locally or use the{' '}
            <a href="http://manager.lisktools.eu" target="_blank" rel="noopener noreferrer">
              non-SSL version of this website
            </a>
            .
          </li>
        </ul>
      </div>
    )
  },

  {
    question: 'Is it safe to enter my node data in a tool like this?',
    answer: (
      <div>
        All user data is stored locally on your own device. If you prefer to run the tool locally as
        well, you can find instructions on how to do so{' '}
        <a href="https://github.com/lemii/lisk-manager" target="_blank" rel="noopener noreferrer">
          here
        </a>
        .
      </div>
    )
  },

  {
    question: 'Can I add a node without adding a public key and password?',
    answer: (
      <div>
        Yes, if no public key and password are entered you can still monitor some elements of the
        node. However, toggling the forging status will be disabled.
      </div>
    )
  },

  {
    question: `I keep getting the error 'Could not toggle forging.'`,
    answer: (
      <div>
        This means that your public key and / or password (used to encrypt your passphrase) is
        incorrect. Press the <FontAwesomeIcon icon="bars" /> icon to open up the node menu, verify
        your credentials, and try again.
      </div>
    )
  },

  {
    question: 'Can I contribute to this software?',
    answer: (
      <div>
        Lisk Manager is open source software licensed under MIT. Feel free to submit issues, pull
        requests, or fork the codebase and modify it to your own needs. You can find the repository{' '}
        <a href="https://github.com/lemii/lisk-manager" target="_blank" rel="noopener noreferrer">
          here
        </a>
        .
      </div>
    )
  },

  {
    question: 'How can I support the creator of this tool?',
    answer: (
      <div>
        <p>
          You can support my work by voting for my delegate, or by donating to
          13679271214820914646L.
        </p>
        <a className="btn btn-outline-primary mr-2" href="lisk://delegates/vote?votes=lemii">
          Vote
        </a>{' '}
        <a className="btn btn-outline-primary" href="lisk://wallet?recipient=13679271214820914646L">
          Donate
        </a>
      </div>
    )
  }
];

export default function Faq(): JSX.Element {
  useEffect(() => {
    document.title = 'FAQ | Lisk Manager';
  }, []);

  return (
    <div className="container text-light">
      <h5 className="mb-5">Frequently Asked Questions</h5>
      <div className="accordion" id="accordion">
        {entries.map((entry, index) => {
          const id = 'entry-' + index;

          return <FaqElement key={id} id={id} entry={entry} />;
        })}
      </div>
    </div>
  );
}
