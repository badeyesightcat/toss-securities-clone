// Write the raw fetch function.
// This is just a plain async function — no hooks, no React.
// It accepts a cursor for pagination and a filter object for ticker/category filtering.

import type { NewsFeedPage, NewsFilter, NewsArticle } from "@/types/news";

const MOCK_ARTICLES: NewsArticle[] = [
  {
    id: "chosunbiz_2026051501334",
    title: "삼성전기, MLCC 가격 인상 전망에 7%대 급등",
    summary:
      "삼성전기가 15일 장 초반 7%대 강세를 보이고 있다. AI 인프라 수요 증가로 반도체 부품 가격이 오를 것이라는 전망이 나오면서 매수세가 몰리는 것으로 풀이된다. 이날 오전 9시 44분 기준 코스피 시장에서 삼성전기는 전 거래일 대비 8만원 오른 110만4000원에 거래되고 있다. 이날 장 중 113만3000원까지 상승하며 신고가를 경신하기도 했다. 증권가에서 삼성전기의 목표 주가를 줄줄이 상향한 것이 주가 상승에 영향을 미친 것으로 보인다. 증권가에선 AI 서버와 전력 인프라 등 AI향 부품이 늘면서 적층세라믹콘덴서, 플립칩 볼",
    publishedAt: "2026-05-15T09:50:02",
    source: "조선비즈",
    category: "cluster_popular|impact_news",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image5.png",
    relatedStocks: [
      {
        stockCode: "A009150",
        stockName: "삼성전기",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-009150.png",
        fluctuation: -2.05,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "yna_AKR20260515046100008",
    title: "동양·천일고속 3일째 큰 폭 상승…서울고터재개발 기대",
    summary:
      "동양·천일고속 3일째 큰 폭 상승…서울고터재개발 기대 김유아 기자 = 서울고속버스터미널 재개발에 대한 기대감이 커지며 관련주가 3일째 큰 폭으로 상승하고 있다. 15일 오전 9시 25분 기준 유가증권시장에서 천일고속은 전장보다 7.29% 오른 2만1천500원에 거래 중이다. 천일고속은 지난 13일과 14일 각각 상한가로 거래를 마감했고, 이날 장 초반에도 한때 27.63%까지 수직상승하는 모습을 보였다. 동양고속도 장 초반 상한가에 거래되다가 현재 8.54% 오른 6만1천원 안팎서 오르내리고 있다. 서울시장을 뽑는 6·3 지방선거가",
    publishedAt: "2026-05-15T09:59:16",
    source: "연합뉴스",
    category: "impact_news",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image16.png",
    relatedStocks: [
      {
        stockCode: "A000650",
        stockName: "천일고속",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-000650.png",
        fluctuation: 28.47,
        market: "kr",
      },
      {
        stockCode: "A084670",
        stockName: "동양고속",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-084670.png",
        fluctuation: 28.82,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "seokyung_2KCF08BPBF",
    title:
      "삼성전자, 노조 최후통첩에 “다시 대화하자”... 노조 “총파업 이후 협의할 것”",
    summary:
      "15일 10시 노조 최후통첩에 사측 회신 “기존 OPI 제도는 유지할 것” 국민의 부응에 재협상 제안도 노조 “총파업 이후 협상 논의” 이달 21일부터 18일간 총파업 예정 삼성전자 과반 노동조합이 중앙노동위원회 사후조정 결렬 이후 사측의 재협상 제안에도 총파업 강행에 나선다. 15일 사측은 초기업노동조합 삼성전자 지부에 보낸 공문을 통해 “협상 타결을 바라는 임직원과 주주, 국민의 바람에 부응해 조건 없이 다시 만나 대화할 것을 거듭 제안한다”며 “회사는 열린 자세로 협의에 나설 것”이라고 밝혔다. 노조는 전날 사측에 “진심으로 ",
    publishedAt: "2026-05-15T10:27:41",
    source: "서울경제",
    category: "impact_news",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image21.png",
    relatedStocks: [
      {
        stockCode: "A005930",
        stockName: "삼성전자",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-005930.png",
        fluctuation: -8.53,
        market: "kr",
      },
      {
        stockCode: "A448330",
        stockName: "KODEX 삼성전자채권혼합",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-448330.png?20250207",
        fluctuation: -2.81,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "yna_AKR20260515046900017",
    title: "에스티팜, UN 글로벌콤팩트에 가입",
    summary:
      "에스티팜, UN 글로벌콤팩트에 가입 루닛, 세브란스병원과 의료 AI 개발 MOU GC녹십자, 과기부 '신약 개발 AI 플랫폼' 과제 참여 신선미 기자 = 에스티팜이 자발적 기업 지속가능성 이니셔티브인 '유엔 글로벌콤팩트'에 가입하며 글로벌 ESG 경영을 강화하고 있다. ▲ 에스티팜은 UNGC에 가입하고, UNGC가 권장하는 인권과 노동, 환경, 반부패 분야 10대 원칙 준수 성과와 실천 로드맵을 담은 이행보고서를 매년 공개할 계획이라고 15일 밝혔다. 에스티팜은 최근 유엔 본부에 성무제 대표이사 명의의 가입 지지 서한을 전달하며 1",
    publishedAt: "2026-05-15T10:14:21",
    source: "연합뉴스",
    category: "impact_news",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image11.png",
    relatedStocks: [
      {
        stockCode: "A237690",
        stockName: "에스티팜",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-237690.png",
        fluctuation: -8.42,
        market: "kr",
      },
      {
        stockCode: "A328130",
        stockName: "루닛",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-328130.png",
        fluctuation: -0.97,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "chosunbiz_2026051501270",
    title: "크래프톤 신작 ‘서브노티카2’, 첫날 100만장 판매",
    summary:
      "크래프톤이 신작 ‘서브노티카 2’를 15일 얼리 액세스로 선보이자마자 판매량 100만장을 돌파했다. 크래프톤은 미국 자회사 언노운 월즈가 개발한 ‘서브노티카 2’가 얼리 액세스 출시 당일 기준 누적 판매량 100만장을 넘어섰다고 밝혔다. ‘서브노티카 2’는 전 세계적으로 600만장 이상 판매된 인기 해양 어드벤처 게임 ‘서브노티카’의 후속작이다. 이날 스팀, 에픽게임즈 스토어, 엑스박스 시리즈 X|S에서 동시 출시됐다. ‘서브노티카 2’는 전작과 다른 외계 행성을 배경으로 하며, 언리얼 엔진 5 기반의 그래픽을 통해 미지의 생태계를",
    publishedAt: "2026-05-15T09:42:00",
    source: "조선비즈",
    category: "impact_news",
    imageUrl:
      "https://biz.chosun.com/resizer/v2/S5CX6WWJJRG55LIY2TPVZLOYFY.jpg?auth=98763a42f1b404f2360f0880865a69e1c44a02fb5340b7c9e8b187b109d0c511&width=1920&height=1080&smart=true",
    relatedStocks: [
      {
        stockCode: "A259960",
        stockName: "크래프톤",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-259960.png",
        fluctuation: -3.57,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "newspim_20260515000361",
    title: "한국금융지주·미래에셋증권↑…코스피 8000 경신에 증권주 강세",
    summary:
      "코스피가 장중 한때 8000포인트를 돌파하며 사상 첫 8000선을 경신한 가운데 증권주가 일제히 강세를 보이고 있다. 15일 한국거래소에 따르면 이날 오전 10시 6분 기준 한국금융지주는 전일 대비 1만9500원 오른 27만7500원에 거래되고 있다. 같은 시각 미래에셋증권은 400원 오른 7만2700원, 키움증권은 전일 대비 보합인 42만원에 각각 거래됐다. 삼성증권은 2100원 내린 12만7900원, NH투자증권은 1000원 내린 3만4000원, 한화투자증권은 80원 내린 7260원에 거래됐다. 증권주 강세의 배경으로는 해외 대",
    publishedAt: "2026-05-15T10:39:18",
    source: "뉴스핌",
    category: "cluster_popular",
    imageUrl: "https://img.newspim.com/news/2026/05/15/260515095205375_w.jpg",
    relatedStocks: [
      {
        stockCode: "A006800",
        stockName: "미래에셋증권",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-006800.png?20240416",
        fluctuation: -4.28,
        market: "kr",
      },
      {
        stockCode: "A071050",
        stockName: "한국금융지주",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-071050.png",
        fluctuation: -0.19,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "maekyung_000012048998",
    title: "영업이익 1조 넘었다…‘어닝 서프라이즈’ 한국금융지주 강세",
    summary:
      "1분기 어닝 서프라이즈를 발표한 한국금융지주가 강세다. 15일 오전 10시17분 한국금융지주는 전 거래일 보다 1만6000원 오른 27만4000원에 거래되고 있다. 한국금융지주는 1분기 연결 기준 영업이익 1조1063억원을 기록했다고 밝혔다. 전년 동기 대비 108.89% 증가한 수치다. 지배주주순이익도 9149억원으로 같은 기간 99.6% 상승했다. 시장 기대치를 뛰어넘는 수치로, ELS 조기상환 확대 등 관련 손익 개선, 저축은행·캐피탈·운용 자회사의 투자손익 개선에 기인한 것으로 분석된다. 매경 자이앤트 텔레그램이 집계한 결과",
    publishedAt: "2026-05-15T11:26:41",
    source: "매일경제",
    category: "cluster_popular|impact_news",
    imageUrl:
      "https://wimg.mk.co.kr/news/cms/202605/15/news-g.v1.20260122.36790aaf87904dc08c07dd569a40144e_P1.jpg",
    relatedStocks: [
      {
        stockCode: "A071050",
        stockName: "한국금융지주",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-071050.png",
        fluctuation: -0.19,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "edaily_2026051510580201057",
    title:
      "메디아나, 1분기 영업익 16억원...전년比 28% 증가 2분기 신제품 효과로 성장 가속 기대",
    summary:
      "웨어러블 ECG·통합 모니터링 본격화 2분기 신제품 효과로 성장 가속 기대 메디아나가 올해 1분기 최근 3개년 기준 최대 매출을 달성하며 수익성까지 동반 개선했다. 북미 시장 확대와 원가 구조 개선이 실적을 끌어올린 가운데, 2분기부터는 신제품 효과까지 더해질 전망이다. 메디아나는 15일 1분기 연결 기준 매출 161억원, 영업이익 16억원을 기록했다고 밝혔다. 영업이익은 전년 동기 대비 28% 늘었고, 당기순이익은 24억원으로 52% 증가했다. 부문별로는 환자감시장치가 76억원으로 전체 매출의 47%를 차지하며 13% 성장을 이끌",
    publishedAt: "2026-05-15T10:58:02",
    source: "이데일리",
    category: "impact_news",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image4.png",
    relatedStocks: [
      {
        stockCode: "A041920",
        stockName: "메디아나",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-041920.png",
        fluctuation: -5.08,
        market: "kr",
      },
      {
        stockCode: "A208370",
        stockName: "셀바스헬스케어",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-208370.png",
        fluctuation: -2.68,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "yna_AKR20260515079900017",
    title: '두나무 지분 일부 처분한 카카오…"AI 투자재원 확보"',
    summary:
      "두나무 지분 일부 처분한 카카오…AI 투자재원 확보 2015년 33억원 투자 후 잔여지분 포함 가치 약 500배로 한상용 기자 = 카카오 자회사 카카오인베스트먼트가 가상자산 거래소 업비트 운영사 두나무 지분 일부를 1조원대에 처분한다. 카카오는 15일 카카오인베스트먼트가 보유 중인 두나무 주식 228만4천주를 1조32억5천만원에 처분하기로 했다고 공시했다. 처분 목적은 미래 투자재원 확보이며, 처분 예정일은 다음 달 15일이다. 이번 처분 후 카카오인베스트먼트의 두나무 보유 주식 수는 140만6천50주, 지분율은 4.03%로 낮아진",
    publishedAt: "2026-05-15T11:45:36",
    source: "연합뉴스",
    category: "cluster_popular",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image4.png",
    relatedStocks: [
      {
        stockCode: "A035720",
        stockName: "카카오",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-035720.png",
        fluctuation: -4.02,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "chosunbiz_2026051502211",
    title: "유럽서 원전 세일즈 나선 대우건설… 지역 상생 ‘첫 발’",
    summary:
      "대우건설은 김보현 대표이사가 지난 11일부터 14일까지 오스트리아와 체코를 방문해 신규 원전 사업 협력을 강화하고 지역 상생 활동을 펼쳤다고 15일 밝혔다. 김 대표는 지난 13일 체코 원전 예정 부지 인근 지자체인 나메슈티 나드 오슬라보우를 방문해 특수 제작된 소방차를 기증했다. 기증식에는 나메슈티 나드 오슬라보우의 체크 얀 코타츠카 시장을 비롯해 지역 하원의원과 의용소방대원, 홍영기 주체코한국대사, 한국수력원자력 및 두산에너빌리티 관계자 등이 참석했다. 이번 소방차 기증은 지역 소방 인프라 강화 필요성에 따라 지난 2024년 9",
    publishedAt: "2026-05-15T11:59:49",
    source: "조선비즈",
    category: "cluster_popular",
    imageUrl:
      "https://biz.chosun.com/resizer/v2/HZUTL2JAAFAXJH4UXI7UER23N4.jpg?auth=1f9dacbd9873de58f90c824fbf97600a4575fceb48b35863dc95b7b100087321&width=1200&height=800&smart=true",
    relatedStocks: [
      {
        stockCode: "A047040",
        stockName: "대우건설",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-047040.png",
        fluctuation: -13.34,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "news1_6167615",
    title: "\"미래에셋 이어 하나금융까지\"…9년 묵은 '금가분리 족쇄' 풀렸다",
    summary:
      "국내 전통 금융권과 가상자산 업계 간 '합종연횡'이 본격화되고 있다. 증권업계의 상징과도 같은 미래에셋그룹이 국내 가상자산 거래소 코빗 인수에 나선 데 이어 4대 금융지주에 속하는 하나은행이 독보적 1위 거래소 업비트 운영사 두나무의 핵심 주주로 올라서며 은행·증권업계가 가상자산 시장과의 접점을 빠르게 넓히는 모습이다. 특히 과거 금융권이 ‘실명계좌 제휴’ 수준에서 가상자산 업계와 거리를 유지했던 것과 달리, 최근에는 직접 인수에 이어 전략적 지분 투자까지 이어지며 '금가분리' 규제 빗장이 사실상 사라졌다는 분석이 나온다. 15일 ",
    publishedAt: "2026-05-15T12:17:55",
    source: "뉴스1",
    category: "cluster_popular",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image8.png",
    relatedStocks: [
      {
        stockCode: "A402340",
        stockName: "SK스퀘어",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-402340.png?20240508",
        fluctuation: -6.4,
        market: "kr",
      },
      {
        stockCode: "A006800",
        stockName: "미래에셋증권",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-006800.png?20240416",
        fluctuation: -4.28,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "edaily_2026051511120101074",
    title: "동국제약, 1분기 사상 최대 실적 기록…매출 1조원 순항",
    summary:
      "동국제약은 올해 1분기 매출액과 영업이익이 전년 대비 모두 증가하며 사상 최대 실적을 기록했다고 15일 밝혔다. 이에 올해는 매출 1조원의 벽을 넘어설 것으로 기대된다. 15일 동국제약이 공시한 연결재무제표에 따르면, 1분기 매출 2510억원, 영업이익 273억원, 당기순이익 263억원으로 전년 동기 대비 각각 12.2%, 8%, 46.4% 증가했다. 개별재무제표로는 매출 2124억원, 영업이익 233억원, 당기순이익 236억원으로 전년 동기 대비 각각 15.9%, 12.3%, 40.6% 증가했다. 이는 매출액 증가에 따른 판매비와",
    publishedAt: "2026-05-15T11:12:01",
    source: "이데일리",
    category: "impact_news",
    imageUrl:
      "https://image.edaily.co.kr/images/photo/files/NP/S/2026/05/PS26051500544.705x1085.0.jpg",
    relatedStocks: [
      {
        stockCode: "A086450",
        stockName: "동국제약",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-086450.png",
        fluctuation: 1.11,
        market: "kr",
      },
      {
        stockCode: "A303810",
        stockName: "동국생명과학",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-303810.png?20250206",
        fluctuation: 0,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "infostockdaily_0000215870",
    title: "공모가 상향 뛰어넘은 세레브라스 시스템 IPO '대성공'",
    summary:
      "인공지능 반도체 시장의 지형도가 재편되고 있다. 현지시간 14일 나스닥에 입성한 세레브라스 시스템이 상장 첫날 공모가 대비 68.14% 폭등한 311.07달러에 마감하며 시장을 뒤흔들었다. 상장 이튿날인 15일 데이마켓에서도 5%대의 추가 상승세를 기록, 327달러선에서 거래되며 시가총액은 1,000억 달러 고지에 올라섰다. 이번 IPO 과정은 세레브라스에 대한 월가의 신뢰를 확인하는 과정이었다. 세레브라스는 당초 주당 115~125달러를 희망 공모가로 제시했으나, 기관 투자자들의 폭발적인 수요로 인해 최종 공모가를 185달러로 확",
    publishedAt: "2026-05-15T10:57:31",
    source: "인포스탁데일리",
    category: "impact_news",
    imageUrl:
      "https://www.infostockdaily.co.kr/news/photo/202605/215870_220612_5533.jpg",
    relatedStocks: [
      {
        stockCode: "NAS2605014002",
        stockName: "세레브라스 시스템",
        logoImageUrl:
          "https://static.toss.im/assets/icon/securities/icn-default.png",
        fluctuation: 3.36,
        market: "us",
      },
    ],
    nation: "US",
  },
  {
    id: "news1_6167438",
    title: '"이대론 안돼" 함영주 하나금융 회장, 두나무 1조 투자로 판 흔든다',
    summary:
      "이대로는 안 된다. 증시 활황 등 우호적인 시장 상황에도 그룹 비은행 부문의 아쉬움이 지속되고 있다. 함영주 하나금융 회장은 올해 신년사에서 은행도, 비은행도 이대로는 안 된다며 '판 자체를 바꾸는 근본적인 혁신'을 주문했다. 대표적인 예로 '원화 스테이블 코인'을 꼽았는데, 하나금융이 국내 최대 가상자산 거래소 플랫폼 업비트를 운영하는 두나무 지분 1조원 어치를 사들이며 실제 판 흔들기에 나섰다. 하나금융은 15일 핵심 계열사인 하나은행 이사회 의결을 통해 카카오인베스트먼트가 보유한 두나무 지분 6.55%를 약 1조 33억 원에 ",
    publishedAt: "2026-05-15T10:40:18",
    source: "뉴스1",
    category: "cluster_popular",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image5.png",
    relatedStocks: [
      {
        stockCode: "A035720",
        stockName: "카카오",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-035720.png",
        fluctuation: -4.02,
        market: "kr",
      },
      {
        stockCode: "A041190",
        stockName: "우리기술투자",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-041190.png",
        fluctuation: 0.32,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "news1_6167797",
    title:
      '코인베이스 CEO "클래리티법 상원 통과, 역사적인 날"…CFTC 위원장도 환영',
    summary:
      "미국 디지털자산 시장구조법안 미국 상원 은행위원회 마크업을 통과하면서 가상자산 업계가 긍정적인 반응을 보였다. 브라이언 암스트롱 코인베이스 CEO는 14일 X를 통해 오늘 클래리티 법이 상원 은행위원회를 통과했다며 미국 디지털자산의 미래를 위한 역사적인 날이라고 밝혔다. 이어 그는 오늘 통과된 클래리티 법은 지난 1월에 나온 기존 안에 비해 , 토큰화, 디파이, CFTC 권한 등에 큰 개선이 있었다고 평가했다. 클래리티 법은 가상자산을 종류별로 분류해 상품선물거래위원회와 증권거래위원회의 관할권을 명확히 하는게 골자다. 구체적으로는 ",
    publishedAt: "2026-05-15T12:20:10",
    source: "뉴스1",
    category: "cluster_popular",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image12.png",
    relatedStocks: [
      {
        stockCode: "US20210414003",
        stockName: "코인베이스",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-COIN.png?20250827",
        fluctuation: -1.89,
        market: "us",
      },
      {
        stockCode: "AMX0230814001",
        stockName: "CONY",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-CONY.png",
        fluctuation: -1.29,
        market: "us",
      },
    ],
    nation: "US",
  },
  {
    id: "bloomingbit_P00120260515112145",
    title: "트럼프, 비트코인 채굴업체 마라 홀딩스 주식 매수",
    summary:
      "도널드 트럼프 미국 대통령이 올해 1분기 비트코인 채굴업체 마라톤디지털 주식을 매수한 것으로 나타났다. 14일 블록스페이스에 따르면 미국 정부윤리청 공시에서 트럼프 대통령은 지난 1월부터 3월 사이 MARA 주식을 매입한 것으로 확인됐다. 다만 구체적인 매입 규모와 평균 매수 단가는 공개되지 않았다.",
    publishedAt: "2026-05-15T11:01:54",
    source: "블루밍비트",
    category: "impact_news",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image11.png",
    relatedStocks: [
      {
        stockCode: "US20140728001",
        stockName: "마라 홀딩스",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-NAS00CY6L-E0.png?20240910",
        fluctuation: -1.8,
        market: "us",
      },
      {
        stockCode: "AMX0250401004",
        stockName: "IMRA",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-IMRA.png",
        fluctuation: -0.57,
        market: "us",
      },
    ],
    nation: "US",
  },
  {
    id: "coinreaders_P00320260515236611",
    title:
      "스트래티지 STRC, 283억 달러 한도 확인...비트코인 매수 완전 중단하나?",
    summary:
      "스트래티지의 비트코인 매입 자금 조달 구조가 향후 1년 안에 핵심 제약에 부딪힐 수 있다는 분석이 나왔다. 코인텔레그래프는 5월 14일 델파이 디지털 보고서를 인용해 스트래티지의 변동금리 시리즈A 영구 스트레치 우선주인 STRC가 약 283억 달러의 승인 발행 한도에 접근하고 있다고 보도했다. 델파이 디지털은 STRC가 스트래티지의 주요 비트코인 매입 수단 중 하나가 됐지만, 발행 한도가 연장되지 않은 채 상한에 도달할 경우 배당 의무는 남아 있는 반면 비트코인 매집은 둔화되거나 멈출 수 있다고 분석했다. 코인텔레그래프는 이번 보고",
    publishedAt: "2026-05-15T11:13:00",
    source: "코인리더스",
    category: "impact_news",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image17.png",
    relatedStocks: [
      {
        stockCode: "US19980611001",
        stockName: "스트래티지",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-MSTR.png?20251223",
        fluctuation: -2.49,
        market: "us",
      },
      {
        stockCode: "NAS0240815003",
        stockName: "MSTX",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-MSTX.png?20251223",
        fluctuation: -5.57,
        market: "us",
      },
    ],
    nation: "US",
  },
  {
    id: "edaily_2026051509411800890",
    title: "씨피시스템, 1분기 매출 52억…순이익 전년比 83.2%↑",
    summary:
      "실적 성장 구간 진입 씨피시스템이 해외 수출 확대에 힘입어 1분기 매출 성장과 순이익 개선을 달성했다. 씨피시스템은 15일 올해 1분기 연결 기준 매출액 52억원, 영업이익 5억원을 기록했다고 밝혔다. 매출액은 전년 동기 대비 5% 증가했으며, 영업이익은 흑자를 유지했다. 당기순이익은 11억원으로 83.2% 증가했다. 매출 증가는 해외 수출 물량 확대가 견인했다. 글로벌 장비사와 산업 자동화 고객사를 중심으로 케이블 보호 시스템 공급이 늘어나며 외형 성장을 이어갔다. 영업이익은 원재료 선매입 영향에도 흑자 기조를 유지했다. 회사는 ",
    publishedAt: "2026-05-15T09:41:18",
    source: "이데일리",
    category: "impact_news",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image1.png",
    relatedStocks: [
      {
        stockCode: "A413630",
        stockName: "씨피시스템",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-413630.png?20240627",
        fluctuation: -3.34,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "seokyung_2KCF1CXEVE",
    title: "“해외 성장 지속”...오리온, 1분기 영업이익 1655억원 26%↑",
    summary:
      "매출 9304억원...전년比 16% 증가 중국, 베트남, 러시아 등 해외 법인이 성장 견인 오리온은 올해 1분기 연결 기준 영업이익이 전년 동기 대비 26% 증가한 1655억 원을 기록했다고 15일 공시했다. 같은 기간 매출은 9304억 원으로 16% 늘었다. 중국?베트남?러시아 등 해외 법인의 고성장세가 실적을 견인했다. 가장 가파른 성장세를 보인 곳은 러시아 법인으로, 참붕어빵과 후레쉬파이 생산능력 확대, 유통채널별 전용 제품 강화, 다제품 체제 안착 등에 힘입어 매출은 34.7% 증가한 905억 원, 영업이익은 66.2% 늘어",
    publishedAt: "2026-05-15T12:00:24",
    source: "서울경제",
    category: "impact_news",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image10.png",
    relatedStocks: [
      {
        stockCode: "A271560",
        stockName: "오리온",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-271560.png",
        fluctuation: -1.95,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "moneytoday_2026051511333112759",
    title: "트럼프 \"더는 안 참는다\" 투심 이탈…코스피 7700 아래로 '뚝'",
    summary:
      "장 중 시황 도널드 트럼프 미국 대통령이 이란에 더는 인내하지 않겠다며 종전 협상에 참여하라는 강경 입장을 내놓으면서 투자자 심리가 급격히 이탈하고 있다. 이날 사상 최초로 8000에 올랐던 코스피는 순식간에 7600대까지 떨어졌다. 15일 오전 11시20분 현재 코스피는 전 거래일 대비 321.87 하락한 7659.54에 거래되고 있다. 코스피는 로봇·전력 인프라 등 순환매에 힘입어 장 중 한 때 8000을 넘어 8046.78까지 올랐으나, 외국인이 매도폭을 확대하며 급격히 하락했다. 코스피 장 중 최저치는 7639.61이다. 코",
    publishedAt: "2026-05-15T11:34:49",
    source: "머니투데이",
    category: "cluster_popular",
    imageUrl: "https://thumb.mt.co.kr/06/2026/05/2026051511333112759_1.jpg",
    relatedStocks: [
      {
        stockCode: "A000250",
        stockName: "삼천당제약",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-000250.png",
        fluctuation: -4.81,
        market: "kr",
      },
      {
        stockCode: "A448330",
        stockName: "KODEX 삼성전자채권혼합",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-448330.png?20250207",
        fluctuation: -2.81,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "yonhap_usa_ICH790118",
    title: "누 홀딩스, 1분기 EPS 컨센 소폭 하회…시간외 하락",
    summary:
      "누 홀딩스는 ‘26년 1분기 영업실적을 다음과 같이 발표했다. ▲ 매출 53.2억 달러를 기록했다. 이는 컨센서스를 2.6억 달러 상회한 것이다. ▲ GAAP EPS 0.18달러를 기록했다. 이는 컨센서스를 0.01달러 하회한 것이다. ▲ 1분기 EPS가 컨센서스를 소폭 하회한 가운데 동사 주가는 시간외 거래에서 3.83% 하락했다. 순이자이익은 32.5억 달러를 기록했다. 영업비용은 6.48억 달러, EBT는 12.3억 달러였다. 결제액은 395억 달러로 컨센서스인 401억 달러를 하회했다. 1분기 동안 고객 400만 명을 추가하",
    publishedAt: "2026-05-15T11:09:36",
    source: "연합인포맥스",
    category: "impact_news",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image14.png",
    relatedStocks: [
      {
        stockCode: "US20211208010",
        stockName: "누 홀딩스",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-NU.png",
        fluctuation: -3.09,
        market: "us",
      },
      {
        stockCode: "NAS0251117011",
        stockName: "NUG",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-NUG.png",
        fluctuation: -6.19,
        market: "us",
      },
    ],
    nation: "US",
  },
  {
    id: "moneytoday_2026051510325235138",
    title: '이브이첨단소재, 1분기 흑자 전환 성공…"올해 수익 개선 원년"',
    summary:
      "이브이첨단소재가 1분기 흑자전환에 성공했다고 15일 밝혔다. 이브이첨단소재는 2004년 2월 설립된 FPCB 전문기업이다. 이브이첨단소재는 1분기 연결기준 매출액 159억원, 영업어익 3억원을 기록했다고 공시했다. 별도 기준으로도 매출 118억원, 영업이익 4억원을 기록했다. 이 회사는 최근 3년간 업황 변화와 비용 증가로 인해 어려운 시기를 보냈다. 별도 기준 영업손실 규모는 2023년 37억원, 2024년 7억원, 2025년 20억원 등이다. 이번 1분기 흑자 전환은 주력 사업인 고부가가치 FPCB 부문의 체질 개선과 신규 사업",
    publishedAt: "2026-05-15T10:48:41",
    source: "머니투데이",
    category: "impact_news",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image18.png",
    relatedStocks: [
      {
        stockCode: "A131400",
        stockName: "이브이첨단소재",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-131400.png?20230523",
        fluctuation: -5.57,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "ajukyung_20260515091130786",
    title: 'iM증권 "삼성화재, 업황 부진에도 손익 안정적…목표가↑"',
    summary:
      "서울 서초구 소재 삼성화재 본사 iM증권은 15일 삼성화재에 대해 업황 둔화 국면에서도 안정적인 손익 흐름을 유지하고 있다고 평가하며 목표주가를 기존보다 상향한 63만원으로 제시했다. 투자의견은 '매수'를 유지했다. 설용진 iM증권 연구원은 이날 리포트를 통해 업황 부진에도 불구하고 안정적 손익을 시현하고 있음을 반영해 이익 추정치를 조정하는 가운데 보유 중인 삼성전자 주식의 주가 상승에 따른 BVPS 상승 등을 종합적으로 반영한다며 이같이 밝혔다. 삼성화재의 올해 1분기 별도 기준 순이익이 전년 동기 대비 4.4% 증가한 6347",
    publishedAt: "2026-05-15T09:45:10",
    source: "아주경제",
    category: "cluster_popular",
    imageUrl:
      "https://image.ajunews.com/content/image/2026/05/15/20260515091237475664.jpg",
    relatedStocks: [
      {
        stockCode: "A000810",
        stockName: "삼성화재",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-000810.png",
        fluctuation: 2.6,
        market: "kr",
      },
      {
        stockCode: "A032830",
        stockName: "삼성생명",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-032830.png",
        fluctuation: -7.87,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "electronicnews_202605150169",
    title: "삼성전기, MLCC 가격 인상 전망에 상승세",
    summary:
      "삼성전기가 MLCC 가격 인상 전망에 상승세다. 삼성전기는 5월 15일 오후 1시 2분 기준 전 거래일보다 1.56% 상승한 1,040,000원에 거래되고 있다. 이는 AI 인프라 수요 증가로 반도체 부품 가격이 오를 것이라는 전망이 나오면서 매수세가 몰리는 것으로 보인다. 증권가에선 AI 서버와 전력 인프라 등 AI향 부품이 늘면서 적층세라믹콘덴서, 플립칩 볼그리드어레이 등 고부가 제품 판매가 확대되고 있다고 분석했다.",
    publishedAt: "2026-05-15T13:07:00",
    source: "전자신문",
    category: "cluster_popular",
    imageUrl:
      "https://img.etnews.com/news/article/2026/05/15/news-p.v1.20260515.e46dd44f27bc4ccba9f45fa4a52dba32_P1.gif",
    relatedStocks: [
      {
        stockCode: "A009150",
        stockName: "삼성전기",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-009150.png",
        fluctuation: -2.05,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "asiae_2026051512032888812",
    title:
      '알에스오토메이션, 1분기 매출 성장 가속…"로봇모션·서보 사업 성장세 확대"',
    summary:
      "로봇모션 및 에너지 제어 전문기업 알에스오토메이션이 올해 1분기 두 자릿수 매출 성장세를 기록하며 본격적인 사업 확대 흐름을 나타냈다. 알에스오토메이션은 올 1분기 연결 기준 매출액이 166억1100만원으로 집계됐다고 밝혔다. 이는 지난해 같은 기간보다 26.7% 증가한 수치다. 회사 측은 반도체 업황 회복과 국내 자동화 투자 확대, 해외 수출 증가 등이 로봇모션 사업 성장에 긍정적으로 작용했다고 설명했다. 이에 따라 이번 분기 매출은 전년 동기 대비 약 35억원 늘었다. 특히 핵심 제품인 서보드라이브 매출이 지난해 같은 기간보다 ",
    publishedAt: "2026-05-15T12:03:28",
    source: "아시아경제",
    category: "impact_news",
    imageUrl:
      "https://cphoto.asiae.co.kr/listimg_link.php?idx=2&no=2026051512030264765_1778814182.jpg",
    relatedStocks: [
      {
        stockCode: "A140670",
        stockName: "알에스오토메이션",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-140670.png",
        fluctuation: -4.18,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "edaily_2026051513160101214",
    title: "코스피, 8000 돌파 후 급락…반도체 투매에 4% 가까이 밀려",
    summary:
      "장중 8046.78 최고치 후 순식간에 300포인트 급락 삼성전자 5.41%·SK하이닉스 4.21%…외국인 3조8000억 투매 LG전자·LG 급등 속 로봇주 강세…반도체 쏠림 해소 부메랑 15일 오후 코스피가 역사적인 8000선 돌파에 성공했지만 반도체 대장주의 급격한 차익실현 매물에 치여 순식간에 300포인트 넘게 급락했다. 장중 최고점과 현재가 간 낙폭이 350포인트를 웃도는 극단적인 변동성이 연출되고 있다. 엠피닥터에 따르면 이날 오후 1시8분 기준 코스피는 전 거래일 대비 3.72% 내린 7684.11을 기록하고 있다. 장중",
    publishedAt: "2026-05-15T13:16:01",
    source: "이데일리",
    category: "cluster_popular",
    imageUrl:
      "https://image.edaily.co.kr/images/photo/files/NP/S/2026/05/PS26051500711.jpg",
    relatedStocks: [
      {
        stockCode: "A005930",
        stockName: "삼성전자",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-005930.png",
        fluctuation: -8.53,
        market: "kr",
      },
      {
        stockCode: "A006400",
        stockName: "삼성SDI",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-006400.png",
        fluctuation: -2.98,
        market: "kr",
      },
    ],
    nation: "KR",
  },
  {
    id: "dealsite_A00161920",
    title: "사토시홀딩스, 엔비디아 '인셉션 프로그램' 선정",
    summary:
      "광통신 장애 예측·교체 추천까지…멀티벤더 운영 플랫폼 부각 코스닥 상장사 '사토시홀딩스'는 자회사 파이버랩스가 운영하는 인공지능 데이터센터 광통신 운영 플랫폼 '파이버'가 엔비디아 인셉션 프로그램의 정식 회원사로 선정됐다고 15일 밝혔다. 엔비디아 인셉션은 AI, 광통신, 고성능 컴퓨팅 분야의 유망 스타트업을 발굴·육성하는 엔비디아의 글로벌 프로그램이다. 선정기업은 엔비디아 전문가 그룹과의 기술 협력, 클라우드 크레딧, 하드웨어 우대 가격, 공동 마케팅 및 글로벌 네트워킹 등 다양한 혜택을 받는다. 파이버랩스는 국내에서는 드물게 광",
    publishedAt: "2026-05-15T11:10:06",
    source: "딜사이트",
    category: "cluster_popular",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image18.png",
    relatedStocks: [
      {
        stockCode: "US19990122001",
        stockName: "엔비디아",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-NAS00208X-E0.png",
        fluctuation: -1.44,
        market: "us",
      },
      {
        stockCode: "A223310",
        stockName: "사토시홀딩스",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-223310.png?20240507",
        fluctuation: 29.96,
        market: "kr",
      },
    ],
    nation: "US",
  },
  {
    id: "moneys_2026051513263360817",
    title: "8000 찍고 300포인트 밀린 코스피…환율 1500원 육박",
    summary:
      "외인 3.9조 탈출 속 삼성전자·하이닉스 5%대 약세, 코스닥도 주요종목 내림세 코스피지수가 15일 장 초반 사상 첫 8000선을 돌파했지만 이후 300포인트 넘게 뒤로 밀리며 약세다. 환율도 1500원에 육박하고 있다. 이날 한국거래소에 따르면 오후 1시16분 기준 코스피는 전 거래일 보다 314.28 떨어진 7667.13 선을 오간다. 오전 장 초반 사상 첫 8000선을 넘어 최고 8046.78까지 찍었지만 이후 대폭 떨어지며 약세로 전환됐다. 개인이 4조2591억원을 사고 있찌만 외국인과 기관은 각각 3조9392억·3891억원",
    publishedAt: "2026-05-15T13:28:53",
    source: "동행미디어시대",
    category: "cluster_popular",
    imageUrl:
      "https://static.tossinvestcdn.com/assets/image/detail-news-default/image3.png",
    relatedStocks: [
      {
        stockCode: "A005930",
        stockName: "삼성전자",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-005930.png",
        fluctuation: -8.53,
        market: "kr",
      },
      {
        stockCode: "A247540",
        stockName: "에코프로비엠",
        logoImageUrl:
          "https://static.toss.im/png-icons/securities/icn-sec-fill-247540.png",
        fluctuation: -7.55,
        market: "kr",
      },
    ],
    nation: "KR",
  },
];

const PAGE_SIZE = 4;

export async function fetchMockNewsPage(
  filter: NewsFilter,
  cursor: string | null,
): Promise<NewsFeedPage> {
  await new Promise((res) => setTimeout(res, 600));

  // Apply filters
  const filtered = MOCK_ARTICLES.filter((a) => {
    const matchesTicker = filter.ticker
      ? a.relatedStocks.filter((r) => r.stockCode === filter.ticker).length > 0
      : true;
    const matchesCategory =
      filter.category === "all" ? true : filter.category === a.category;
    return matchesTicker && matchesCategory;
  });

  // Paginate using cursor as a start index
  const startIndex = cursor ? parseInt(cursor) : 0;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const nextIndex = startIndex + PAGE_SIZE;
  const nextCursor = nextIndex < filtered.length ? String(nextIndex) : null;

  return {
    nextCursor,
    totalCount: filtered.length,
    articles: pageItems,
  };
}
