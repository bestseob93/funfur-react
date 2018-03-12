export const formNames = [
    {id:'productName',        name:'제품 명',      isRequired: true},
    {id:'productPosition_1',  name:'제품 위치(1)', isRequired: true},
    {id:'productPosition_2',  name:'제품 위치(2)', isRequired: true},
    {id:'firstSort_1',        name:'1차 제품 분류', isRequired: true},
    {id:'secondSort_1',       name:'2차 제품 분류', isRequired: true},
    {id:'firstSort_2',        name:'1차 제품 분류', isRequired: false},
    {id:'secondSort_2',       name:'2차 제품 분류', isRequired: false},
    {id:'modelName',          name:'모델 명',     isRequired: true},
    {id:'modelOption',        name:'제품 옵션',    isRequired: true},
    {id:'productColor',       name:'제품 색상',    isRequired: true},
    {id:'sizeWidth',          name:'가로 길이',    isRequired: true},
    {id:'sizeDepth',          name:'세로 길이',    isRequired: true},
    {id:'sizeHeight',         name:'높이',       isRequired: true},
    {id:'mainMaterial',       name:'주요 소재',    isRequired: true},
    {id:'prManufacturer',     name:'제조사',      isRequired: true},
    {id:'productOrigin',      name:'원산지',      isRequired: true},
    {id:'productPrice',       name:'제품 가격',    isRequired: true},
    {id:'productImages',      name:'제품 이미지',   isRequired: true},
    {id:'isDeliverFree',      name:'배송비 유무',   isRequired: true},
    {id:'seoulGyungki',       name:'서울-경기',    isRequired: true},
    {id:'gangwon',            name:'강원',       isRequired: true},
    {id:'chungnam',           name:'충남',       isRequired: true},
    {id:'chungbuk',           name:'충북',       isRequired: true},
    {id:'gyeongbuk',          name:'경북',       isRequired: true},
    {id:'gyeongnam',          name:'경남',       isRequired: true},
    {id:'jeonbuk',            name:'전북',       isRequired: true},
    {id:'jeonnam',            name:'전남',       isRequired: true},
    {id:'jejuSangan',         name:'제주-산간',    isRequired: true},
    {id:'samePrice',         name:'배송비 같음',   isRequired: true},
    {id:'proportionShipping', name:'비례배송',     isRequired: true},
];

const subtitles = [
    '제품 등록',
    '제품 분류',
    '제품 정보',
    '배송 정보',
    '사진 업로드'
];

const labels = [
    '제품명',
    ['위치', '1차 분류', '2차 분류'],
    '배송비', '지역별 배송비 설정', '배송 및 반품/교환/AS 안내',
    ''
];

const fields = [
    ['input', '제품명을 적어주세요.'],
    ['select', '공간별 분류'],
];

const info = [
    {
        subtitle: '제품 등록',
        content: [
            {
                labels: '제품명',
                fields: {
                    tag: 'input',
                    type: 'text',
                    name: '',
                    placeholder: '제품명을 적어주세요',
                    isRequired: true,
                }
            }
        ],
    },
    {
        subtitle: '제품 분류',
        content: [
            {
                labels: '위치',
                fields: {
                    tag: 'select',
                    type: 'option',
                    name: '',
                    placeholder: '제품명을 적어주세요',
                    isRequired: true,
                }
            },
            {
                labels: '1차 분류',
                fields: {
                    tag: 'select',
                    type: 'option',
                    name: '',
                    placeholder: '제품명을 적어주세요',
                    isRequired: true,
                }
            },
            {
                labels: '2차 분류',
                fields: {
                    tag: 'select',
                    type: '',
                    name: '',
                    placeholder: '제품명을 적어주세요',
                    isRequired: true,
                }
            },
        ]
    },
    {
        subtitle: '제품 분류',
        content: [
            {
                labels: '위치',
                fields: {
                    tag: 'select',
                    type: 'option',
                    name: '',
                    placeholder: '제품명을 적어주세요',
                    isRequired: true,
                }
            },
            {
                labels: '1차 분류',
                fields: {
                    tag: 'select',
                    type: 'option',
                    name: '',
                    placeholder: '제품명을 적어주세요',
                    isRequired: true,
                }
            },
            {
                labels: '2차 분류',
                fields: {
                    tag: 'select',
                    type: '',
                    name: '',
                    placeholder: '제품명을 적어주세요',
                    isRequired: true,
                }
            },
        ]
    },

];

// field: {
//         type: 'text',
//         name: '필드1',
//         placeholder: 'place',
//         handler: f => f
// },

const location = [
    '거실',
    '주방',
    '침실',
    '키즈/유아',
    '학생/서재',
    '인테리어 소품',
    '화장실'
];

const firstGroup = [
    ['테이블', '의자', '소파', '거실장'], // 거실
    ['식탁 세트', '식탁', '식탁 의자', '홈 바', '주방 수납장'], // 주방
    ['침대', '화장대', '서랍장', '옷장', '협탁'], // 침실
    ['수납장', '책상/의자', '침대(유아)'], // 키즈/유아
    ['책상', '의자(서재)', '책장', '테이블', '수납장'], // 학생/서재
    ['세면대', '욕실 수납', '기타 욕실 용품']]; // 화장실

const secondGroup = [
    [
        ['소파 테이블', '사이드 테이블', '접이식 테이블', '좌식 테이블'],
        ['테이블 체어', '암체어', '좌식 의자', '접이식 의자', '스툴', '기타'],
        ['1인 소파', '2-3인 소파', '4인 소파', '5인 이상', '리클라이너 소파', '소파베드', '스툴'],
        ['TV장', '장식장&진열장', '수납장', '책장']
    ],
    [
        ['2인', '4인', '6인'],
        ['2인', '4인', '6인'],
        ['테이블&체어', '테이블', '체어'],
        [],
        ['벽 선반', '선반 수납장', '서랍 수납장', '렌지 수납장', '기타 수납장']
    ],
    [
        ['싱글', '슈퍼싱글', '퀸', '킹', '패밀리', '유아/아동', '소파 베드', '접이식 침대'],
        ['화장대 세트', '화장대', '의자', '좌석/미니 화장대'],
        ['미니', '3단', '5단', '와이드'],
        [],
        []
    ],
    [
        ['책장', '장난감 수납장', '옷장/서랍장'],
        ['세트', '책상', '의자'],
        ['유아', '아기']
    ],
    [
        ['책상&의자', '컴퓨터 책상', '독서실 책상', 'h형 책상', '전면 책상', '일반 책상', '좌식 책상'],
        ['아동용 의자', '오피스 체어', '메쉬 의자', '가죽 의자', '패브릭 의자', '좌식 의자', '플라스틱 의자'],
        ['1단', '2단', '3단', '4단', '5단 이상'],
        [],
        []
    ],
    [
        []
    ]
];

const infos = [{
    subtitles,
    labels,
    fields
}];

const makeInfo = (formInfos, subtitles, labels, fields) => {
    


};

infos.map(info => ({
    subtitle: info.subtitles,
    label: info
}));

export const formInfos = [];

