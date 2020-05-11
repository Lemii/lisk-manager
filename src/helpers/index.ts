import moment from 'moment';

export const formatNumber = (input: number): string => {
  try {
    return input.toLocaleString();
  } catch {
    return 'Invalid input';
  }
};

export const formatDate = (input: number): string => {
  try {
    return moment(input).format('LTS');
  } catch {
    return 'Invalid input';
  }
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
