import { getTraversalObj, convertToJson } from 'fast-xml-parser';
import { GoodreadsResponse as IGoodreadsResponse } from '../models/GoodreadsResponse';
import { ResponseCriteria } from '../models/ResponseCriteria';

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

export function xmlToJson(xmlData: string): ResponseCriteria {
  const tObj = getTraversalObj(xmlData, xmlParserOptions);
  const { GoodreadsResponse }: IGoodreadsResponse = convertToJson(
    tObj,
    xmlParserOptions
  );

  return GoodreadsResponse || ({} as ResponseCriteria);
}
