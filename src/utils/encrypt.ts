import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";
/**
 * 封装加密，加密逻辑：使用AES对数据进行加密，然后使用RSA对AES的密钥进行加密
 */

// RSA的公钥
const publicKey =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB";

/**
 *
 * @param data 待加密的数据
 * @returns 返回加密的数据和加密的秘钥
 */
export const encrypt = (data: string) => {
  // 生成AES秘钥
  const aesKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
  // 加密数据
  const encryptedData = CryptoJS.AES.encrypt(data, aesKey).toString();
  // 使用RSA对AES的秘钥进行加密
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  const encryptAESKey = encrypt.encrypt(aesKey);
  return {
    data: encryptedData,
    key: encryptAESKey,
  };
};
