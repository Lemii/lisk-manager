import React from 'react';
import { IFaqEntry } from '../../interfaces';

interface IProps {
  id: string;
  entry: IFaqEntry;
}

export default function FaqElement({ id, entry }: IProps): JSX.Element {
  return (
    <div className="card">
      <div className="card-header" id={'heading-' + id}>
        <h2 className="mb-0">
          <button
            className="btn btn-link collapsed"
            type="button"
            data-toggle="collapse"
            data-target={'#' + id}
            aria-expanded="false"
            aria-controls={id}
          >
            {entry.question}
          </button>
        </h2>
      </div>

      <div id={id} className="collapse" aria-labelledby={'heading-' + id} data-parent="#accordion">
        <div className="card-body">{entry.answer}</div>
      </div>
    </div>
  );
}
