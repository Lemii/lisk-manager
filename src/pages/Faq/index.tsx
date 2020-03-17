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
    question: 'Is it safe to enter my node data in a tool like this?',
    answer: (
      <div>
        All user data is stored locally on your own device. If you prefer to run the tool locally as
        well, you can find instructions on how to do so{' '}
        <a href="https://github.com/lemii/lisk-manager" target="_blank" rel="noopener noreferrer">
          here
        </a>
        . Lisk Manager is open source software, so feel free to fork it and modify it to your own
        needs.
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
