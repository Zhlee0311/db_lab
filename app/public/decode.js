const crypto = require('crypto');
const secret = 'abcdefg';


exports.tokenDecode = (token) => {
  function base64Decode(data) {
    return JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
  }
  const parts = token.split('.');
  const originData = parts[0];
  const providedHash = parts[1];

  const hash = crypto.createHmac('sha256', secret).update(originData).digest('hex');
  if (hash != providedHash) {
    return null;
  } else {
    return base64Decode(originData);
  }
}
