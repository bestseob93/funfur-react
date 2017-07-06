import crypto from 'crypto';

export function encryptIt(target) {
    return new Promise(
        (resolve, reject) => {
            let cipher = crypto.createCipher('aes192', process.env.REACT_APP_SK);
            cipher.update(target, 'utf8', 'base64');
            let cipherOutput = cipher.final('base64');
            resolve(cipherOutput);
            if(!target) {
                reject('target is empty');
            }
        });
}