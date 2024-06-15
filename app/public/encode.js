const crypto = require('crypto');
const secret = 'abcdefg';


exports.tokenEncode = (data) => {
  function base64Encode(data) {
    return Buffer.from(JSON.stringify(data)).toString('base64');
  }

  const originData = base64Encode(data);
  const hash = crypto.createHmac('sha256', secret).update(originData).digest('hex');
  const token = `${originData}.${hash}`;
  return token;

}

