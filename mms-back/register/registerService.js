const axios = require("axios");
const xml2js = require("xml2js");

const db = require("../utils/db");
const { md5 } = require("../utils/utils");
// const SMS = require('./sms')

const SEC_SERVER_URL = "http://192.168.100.243";

async function xml2obj(xml) {
  const parser = new xml2js.Parser();
  const result = await new Promise((resolve, reject) =>
    parser.parseString(xml, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  );
  return result;
}

async function dataByPin(pin) {
  const xmlData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"  
  xmlns:xro="http://x-road.eu/xsd/xroad.xsd"  
  xmlns:iden="http://x-road.eu/xsd/identifiers"  
  xmlns:zags="http://tunduk-seccurity-infocom.x-road.fi/producer">  
  <soapenv:Header>  
  <xro:userId>1</xro:userId>  
  <xro:service iden:objectType="SERVICE">  
  <iden:xRoadInstance>central-server</iden:xRoadInstance>  
  <iden:memberClass>GOV</iden:memberClass>  
  <iden:memberCode>70000005</iden:memberCode>  
  <!--Optional:-->  
  <iden:subsystemCode>zags-service</iden:subsystemCode>  
  <iden:serviceCode>zagsDataByPin</iden:serviceCode>  
  <iden:serviceVersion>v1</iden:serviceVersion>  
  </xro:service>  
  <xro:protocolVersion>4.0</xro:protocolVersion>  
  <xro:issue>123</xro:issue>  
  <xro:id>1</xro:id>  
  <xro:client iden:objectType="SUBSYSTEM">  
  <iden:xRoadInstance>central-server</iden:xRoadInstance>  
  <iden:memberClass>GOV</iden:memberClass>  
  <iden:memberCode>70000016</iden:memberCode>  
  <!--Optional:-->  
  <iden:subsystemCode>umut</iden:subsystemCode>  
  </xro:client>  
  </soapenv:Header>  
  <soapenv:Body>  
  <zags:zagsDataByPin>  
  <request>  
  <pin>${pin}</pin>  
  </request>  
  </zags:zagsDataByPin>  
  </soapenv:Body>  
  </soapenv:Envelope>`;
  return xmlData;
}

async function fetchData(xmlData) {
  try {
    const response = await axios.post(SEC_SERVER_URL, xmlData, {
      timeout: 30000,
      headers: {
        "Content-Type": "text/xml",
      },
      // httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    const respObject = await xml2obj(response.data);
    const respData =
      respObject["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
        "ts1:zagsDataByPinResponse"
      ][0]["ts1:response"][0];
    if (respData["faultcode"]) {
      return { data: false, error: "404" };
    }
    if (respData["ts1:pin"]) {
      const data = {
        pin: respData["ts1:pin"][0],
        name: respData["ts1:name"][0],
        surname: respData["ts1:surname"][0],
        patronymic: respData["ts1:patronymic"][0],
        gender: respData["ts1:gender"][0],
        // maritalStatus: respData['ts1:maritalStatus'][0],
        // maritalStatusId: respData['ts1:maritalStatusId'][0],
        nationality: respData["ts1:nationality"][0],
        nationalityId: respData["ts1:nationalityId"][0],
        citizenship: respData["ts1:citizenship"][0],
        citizenshipId: respData["ts1:citizenshipId"][0],
        // pinBlocked: respData['ts1:pinBlocked'][0],
        // pinGenerationDate: respData['ts1:pinGenerationDate'][0],
        dateOfBirth: respData["ts1:dateOfBirth"][0].slice(0, 10),
        // deathDate: respData['ts1:deathDate'][0]
      };
      return { data, error: false };
    }
    return { data: false, error: "400" };
  } catch (error) {
    console.log("zags fetchData error ", error.message);
    return { data: false, error: error.message };
  }
}

async function isPinExist(pin) {
  try {
    const { rows } = await db.query(
      "SELECT EXISTS( select 1 FROM challenger where challenger.pin =$1)",
      [pin]
    );
    if (rows.length > 0) {
      const { exists } = rows[0];
      return exists;
    }
    return false;
  } catch (err) {
    console.log("error login", err.message);
    return false;
  }
}
async function isEmailExist(email) {
  try {
    const { rows } = await db.query(
      "SELECT EXISTS( select 1 FROM challenger where challenger.email =$1)",
      [email]
    );
    if (rows.length > 0) {
      const { exists } = rows[0];
      return exists;
    }
    return false;
  } catch (err) {
    console.log("error login", err.message);
    return false;
  }
}
async function insertChallenger(
  surname,
  name,
  middlename,
  pin,
  gender,
  dateBirth,
  passport,
  datePassport,
  tel,
  email,
  password
) {
  try {
    const callRes = await db.query(
      `call "sp_challenger_ins"($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`,
      [
        surname,
        name,
        middlename,
        pin,
        gender,
        dateBirth,
        passport,
        datePassport,
        tel,
        email,
        password,
      ]
    );
    return callRes.error ? false : true;
  } catch (err) {
    console.log("error insertChallenger", err.message);
    return false;
  }
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

module.exports = {
  dataByPin,
  fetchData,
  isPinExist,
  isEmailExist,
  insertChallenger,
  getAge,
  md5,
};
