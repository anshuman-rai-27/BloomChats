import { secretbox,randomBytes, box } from "tweetnacl";
import {encodeUTF8, decodeBase64, decodeUTF8, encodeBase64 } from "tweetnacl-util";
import tw from 'twrnc'


const newNonce = () => randomBytes(secretbox.nonceLength);


export const generateKey = () => encodeBase64(randomBytes(secretbox.keyLength));

export const encrypt = (json:any, key:string) => {
  const keyUint8Array = decodeBase64(key);

  const nonce = newNonce();
  const messageUint8 = decodeUTF8(JSON.stringify(json));
  const box = secretbox(messageUint8, nonce, keyUint8Array);

  const fullMessage = new Uint8Array(nonce.length + box.length);
  fullMessage.set(nonce);
  fullMessage.set(box, nonce.length);

  const base64FullMessage = encodeBase64(fullMessage);
  return base64FullMessage;
};

export const decrypt = (messageWithNonce:any, key:string) => {
  const keyUint8Array = decodeBase64(key);
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, secretbox.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(
    secretbox.nonceLength,
    messageWithNonce.length
  );

  const decrypted = secretbox.open(message, nonce, keyUint8Array);

  if (!decrypted) {
    throw new Error("Could not decrypt message");
  }

  const base64DecryptedMessage = encodeUTF8(decrypted);
  return JSON.parse(base64DecryptedMessage);
};
export const generateKeyPair = () => box.keyPair();

export const encryptBox = (
  secretOrSharedKey: Uint8Array,
  json: any,
  key?: Uint8Array
) => {
  const nonce = newNonce();
  const messageUint8 = encodeUTF8(JSON.stringify(json));
  const encrypted = key
    ? box(messageUint8, nonce, key, secretOrSharedKey)
    : box.after(messageUint8, nonce, secretOrSharedKey);

  const fullMessage = new Uint8Array(nonce.length + encrypted.length);
  fullMessage.set(nonce);
  fullMessage.set(encrypted, nonce.length);

  const base64FullMessage = encodeBase64(fullMessage);
  return base64FullMessage;
};

export const decryptBox = (
  secretOrSharedKey: Uint8Array,
  messageWithNonce: string,
  key?: Uint8Array
) => {
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(
    box.nonceLength,
    messageWithNonce.length
  );

  const decrypted = key
    ? box.open(message, nonce, key, secretOrSharedKey)
    : box.open.after(message, nonce, secretOrSharedKey);

  if (!decrypted) {
    throw new Error('Could not decrypt message');
  }

  const base64DecryptedMessage = decodeUTF8(decrypted);
  return JSON.parse(base64DecryptedMessage);
};


export const className = (className:string)=> tw`${className}`;