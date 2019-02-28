const { createCipheriv, createDecipheriv } = require('crypto');
const { cryptKeys } = require('../../config.json');

const [
  key,

  // TODO: make initVector unique per boot, share with webhook-server over Redis
  initVector
] = cryptKeys.map(key => Buffer.from(key, 'base64'));

const crypt = (cipher, data, inputType, outputType) =>
  Buffer.concat([
    cipher.update(data, inputType),
    cipher.final()
  ]).toString(outputType);

module.exports = {
  encrypt: (data, inputType = 'utf8', outputType = 'base64') =>
    crypt(
      createCipheriv('aes-256-ctr', key, initVector),
      data,
      inputType,
      outputType
    ),

  decrypt: (data, inputType = 'base64', outputType = 'utf8') =>
    crypt(
      createDecipheriv('aes-256-ctr', key, initVector),
      data,
      inputType,
      outputType
    )
};