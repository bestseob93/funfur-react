export function checkBizID(bizId) {
    return new Promise(
        (resolve, reject) => {
            if(bizId === '' || typeof bizId !== 'string') {
                resolve(false);
            }

            if(bizId.length !== 10) {
                resolve(false);
            }
            let checkID = "137137135";
            let chkSum = 0;
            let lastNumber = 0;
            for(let i=0; i<9; i++) {
                let tmp = Number(checkID.charAt(i)) * Number(bizId.charAt(i));
                if(i < 8) {
                    chkSum += tmp;
                } else { // 9번째 곱셈의 결과를 각 자리수를 더함 ( ex: 9*5 = 45 => 4 + 5 = 9) 
                    chkSum += Number(String(tmp).charAt(0)) + Number(String(tmp).charAt(1));
                    lastNumber = (10 - (chkSum % 10)) % 10;
                }
            }

            if(parseInt(bizId.charAt(9)) === lastNumber) {
                resolve(true);
            } else {
                reject('잘못된 사업자 번호');
            }
        }
    );
}