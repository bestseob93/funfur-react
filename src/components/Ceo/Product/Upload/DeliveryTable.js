import React from 'react';

function DeliveryTable({form, sameCost, changeHandler, handleBlur}) {
    const defaultValue = undefined;
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
                            name="SeoulGyungki"
                            placeholder="쉼표(,) 제외"
                            onChange={changeHandler}
                            onBlur={ form.get('isCostSame') ? handleBlur : defaultValue }
                        />원
                    </td>
                </tr>
                {/* 모두 동일에 체크되면 첫번째 input 떠날 때 나머지 값들 모두 서울경기와 가격 동일 */}
                <tr>
                    <td>강원</td>
                        { form.get('isCostSame') ? defaultValue : <td><input 
                            type="text"
                            name="GangWon"
                            disabled={form.get('isCostSame')}
                            value={form.get('isCostName') ? sameCost : defaultValue }
                            placeholder={form.get('isCostSame') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('isCostSame') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>충남 세종 대전</td>
                        { form.get('isCostSame') ? defaultValue : <td><input 
                            type="text"
                            name="ChungNam"
                            disabled={form.get('isCostSame')}
                            value={form.get('isCostName') ? sameCost : defaultValue }
                            placeholder={form.get('isCostSame') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('isCostSame') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>충북</td>
                        { form.get('isCostSame') ? defaultValue : <td><input 
                            type="text"
                            name="ChungBuk"
                            disabled={form.get('isCostSame')}
                            value={form.get('isCostName') ? sameCost : defaultValue }
                            placeholder={form.get('isCostSame') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('isCostSame') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>경북 대구</td>
                        { form.get('isCostSame') ? defaultValue : <td><input 
                            type="text"
                            name="GyeongBuk"
                            disabled={form.get('isCostSame')}
                            value={form.get('isCostName') ? sameCost : defaultValue }
                            placeholder={form.get('isCostSame') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('isCostSame') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>경남 울산 부산</td>
                        { form.get('isCostSame') ? defaultValue : <td><input 
                            type="text"
                            name="GyeongNam"
                            disabled={form.get('isCostSame')}
                            value={form.get('isCostName') ? sameCost : defaultValue }
                            placeholder={form.get('isCostSame') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('isCostSame') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>전북</td>
                        { form.get('isCostSame') ? defaultValue : <td><input 
                            type="text"
                            name="JeonBuk"
                            disabled={form.get('isCostSame')}
                            value={form.get('isCostName') ? sameCost : defaultValue }
                            placeholder={form.get('isCostSame') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('isCostSame') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>전남 광주</td>
                        { form.get('isCostSame') ? defaultValue : <td><input 
                            type="text"
                            name="JeonNam"
                            disabled={form.get('isCostSame')}
                            value={form.get('isCostName') ? sameCost : defaultValue }
                            placeholder={form.get('isCostSame') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('isCostSame') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
                <tr>
                    <td>제주 산간지역</td>
                        { form.get('isCostSame') ? defaultValue : <td><input 
                            type="text"
                            name="JeJuSanGan"
                            disabled={form.get('isCostSame')}
                            value={form.get('isCostName') ? sameCost : defaultValue }
                            placeholder={form.get('isCostSame') ? sameCost: "쉼표(,) 제외"}
                            onChange={changeHandler}
                        />원</td> }
                        { form.get('isCostSame') ? <td><span>{sameCost}</span>원</td> : defaultValue }
                </tr>
            </tbody>
        </table>
    );
}

export default DeliveryTable;