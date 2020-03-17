import moment from 'moment';

export const formatNumber = (input: number): string => input.toLocaleString();

export const formatDate = (input: number): string => moment(input).format('LTS');
