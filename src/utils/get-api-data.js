import dotenv from 'dotenv';
import axios from 'axios';
import { getTraversalObj, convertToJson } from 'fast-xml-parser';

dotenv.config();

const sendSuccessResponse = (res, data) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ data }));
};

const sendErrorResponse = (res, error) => {
  res.status(400).send({ message: error });
};

const generateURL = suffix => {
  const { BASE_URL, API_KEY } = process.env;
  const joiner = suffix.indexOf('?') > -1 ? '&' : '?';

  return `${BASE_URL}/${suffix}${joiner}key=${API_KEY}`;
};

const xmlToJson = data => {
  const xmlParserOptions = {
    attributeNamePrefix: '@_',
    attrNodeName: 'attr', // default is 'false'
    textNodeName: '#text',
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    decodeHTMLchar: false,
    cdataTagName: '__cdata', // default is 'false'
    cdataPositionChar: '\\c'
  };
  const tObj = getTraversalObj(data, xmlParserOptions);

  return convertToJson(tObj, xmlParserOptions);
};

export const getAPIData = async ({
  urlSuffix,
  apiPropName,
  parseFunction,
  res
}) => {
  try {
    const { data } = await axios.get(generateURL(urlSuffix));
    const { GoodreadsResponse: grRes } = xmlToJson(data);
    const parsedData = parseFunction(grRes && grRes[apiPropName]);

    sendSuccessResponse(res, parsedData);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
