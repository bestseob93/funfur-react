import React from 'react';
import { fromJS, Map } from 'immutable';

function DeliveryTable({form, sameCost, changeHandler, handleBlur, currentValue}) {
    const defaultValue = undefined;
    const currentVal = Map(currentValue).toJS();

    return (
        <table className="text-center col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            <tbody>
                <tr>
                    <th className="text-center">지역</th>
                    <th className="text-center">배송비용</th>
                </tr>
                <tr>
                    <td>서울 경기 인천</td>
                    <td><input
                            type="text"
                            name="seoulGyungki"
                            placeholder="쉼표(,) 제외"
                            value={currentVal.seoul_gyungki}
                            onChange={changeHandler}
                            onBlur={ form.get('samePrice') ? handleBlur : defaultValue }
                        />원
                    </td>
                </tr>
                {/* 모두 동일에 체크되면 첫번째 input 떠날 때 나머지 값들 모두 서울경기와 가격 동일 */}
                <tr>
                    <td>강원</td>
                        { form.get('samePrice') ? defaultValue : <td><input
                            type="text"
                            name="gangwon"
                            disabled={form.get('samePrice')}
                            value={currentVal.gangwon}
                            placeholder={form.get('samePrice') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('samePrice') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>충남 세종 대전</td>
                        { form.get('samePrice') ? defaultValue : <td><input
                            type="text"
                            name="chungnam"
                            disabled={form.get('samePrice')}
                            value={currentVal.chungnam}
                            placeholder={form.get('samePrice') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('samePrice') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>충북</td>
                        { form.get('samePrice') ? defaultValue : <td><input
                            type="text"
                            name="chungbuk"
                            disabled={form.get('samePrice')}
                            value={currentVal.chungbuk}
                            placeholder={form.get('samePrice') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('samePrice') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>경북 대구</td>
                        { form.get('samePrice') ? defaultValue : <td><input
                            type="text"
                            name="gyeongbuk"
                            disabled={form.get('samePrice')}
                            value={currentVal.gyeongbuk}
                            placeholder={form.get('samePrice') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('samePrice') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>경남 울산 부산</td>
                        { form.get('samePrice') ? defaultValue : <td><input
                            type="text"
                            name="gyeongnam"
                            disabled={form.get('samePrice')}
                            value={currentVal.gyeongnam}
                            placeholder={form.get('samePrice') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('samePrice') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>전북</td>
                        { form.get('samePrice') ? defaultValue : <td><input
                            type="text"
                            name="jeonbuk"
                            disabled={form.get('samePrice')}
                            value={currentVal.jeonbuk}
                            placeholder={form.get('samePrice') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('samePrice') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>전남 광주</td>
                        { form.get('samePrice') ? defaultValue : <td><input
                            type="text"
                            name="jeonnam"
                            disabled={form.get('samePrice')}
                            value={currentVal.jeonnam}
                            placeholder={form.get('samePrice') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('samePrice') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>제주 산간지역</td>
                        { form.get('samePrice') ? defaultValue : <td><input
                            type="text"
                            name="jejuSangan"
                            disabled={form.get('samePrice')}
                            value={currentVal.jeju_sangan}
                            placeholder={form.get('samePrice') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('samePrice') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
            </tbody>
        </table>
    );
}

export default DeliveryTable;