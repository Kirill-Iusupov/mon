const jwt = require("jsonwebtoken");
const crypto = require("./crypto");
const { JWT_ACCESS_SECRET, JWT_EXPIRE_HOURS } = require("./config");

const generateAccessToken = (data) => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({ data: crypto.encrypt(JSON.stringify(data)) }, JWT_ACCESS_SECRET, {
    expiresIn: JWT_EXPIRE_HOURS,
  });
};
const generateLinkToken = (data, expires = 600) => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({ data }, JWT_ACCESS_SECRET, {
    expiresIn: expires || JWT_EXPIRE_HOURS,
  });
};

const verifyAccessToken = (token) => {
  try {
    const rawToken = String(token).split(' ')
    if (rawToken[0] != 'Bearer' || rawToken[1].length < 20) return false;
    const decodedData = jwt.verify(rawToken[1], JWT_ACCESS_SECRET);
    if (!decodedData) {
      return false;
    }
    return decodedData
  } catch (e) {
    console.log(e)
    return false;
  }
};

const getTokenData = (token) => {
  try {
    const rawToken = String(token).split(' ')
    if (rawToken[0] != 'Bearer' || rawToken[1].length < 20) {
      return false;
    }
    const decodedData = jwt.verify(rawToken[1], JWT_ACCESS_SECRET);

    if (!decodedData) {
      return false;
    }
    // console.log({ decodedData })
    // const dec = crypto.decrypt(decodedData.data)
    // console.log({ dec })
    const result = JSON.parse(crypto.decrypt(decodedData.data))
    // console.log({ result })
    return { ...result }
  } catch (e) {
    console.log(e)
    return false;
  }
};

module.exports = { generateAccessToken, verifyAccessToken, getTokenData, generateLinkToken };
