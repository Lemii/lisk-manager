import { saveAs } from 'file-saver';
import moment from 'moment';

import { IJsonData } from '../interfaces';

export const saveJsonFile = (data: IJsonData): void => {
  const stringifiedData = JSON.stringify(data, null, 2);

  const blob = new Blob([stringifiedData], {
    type: 'application/json;charset=utf-8'
  });

  saveAs(blob, 'lisk-manager_export_' + moment().format('YYYY-MM-DD_hh-mm-ss'));
};
