import crypto from 'crypto';

const algo = 'aes-256-ctr';

export const encrypt = (message: string, passphrase: string): string => {
  const cipher = crypto.createCipher(algo, passphrase);
  let crypted = cipher.update(message, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

export const decrypt = (message: string, passphrase: string): string => {
  const decipher = crypto.createDecipher(algo, passphrase);
  let dec = decipher.update(message, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

export const hash = (data: string): string => {
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex');
};
