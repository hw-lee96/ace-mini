from fastapi import FastAPI, Request, Depends, Form, status
from fastapi.responses import RedirectResponse

# 미들 웨어 관련
from fastapi.middleware.cors import CORSMiddleware

# env 관련
from dotenv import load_dotenv
import os

# 데이터 DB저장 관련
import sys
import os

# 현재 파일(main.py)의 경로를 기준으로 상대 경로를 사용하여 'save_DB' 폴더 경로를 추가합니다.
current_dir = os.path.dirname(os.path.abspath(__file__))
save_db_dir = os.path.join(current_dir, 'save_DB')
sys.path.append(save_db_dir)




# .env 파일의 변수를 프로그램 환경변수에 추가
load_dotenv()

DB_ID = os.getenv('DB_ID')
DB_PW = os.getenv('DB_PW')
DB_URL = os.getenv('DB_URL')

app = FastAPI()

# db예제
from pymongo.mongo_client import MongoClient
uri = f'mongodb+srv://{DB_ID}:{DB_PW}{DB_URL}'

## 1. db client 생성
client = MongoClient(uri)

## 2. 사용하려는 database 특정
db = client.ace_mini
## 3. news라는 collection(table 느낌)으로 연결
news = db.news

## 4. news에 insert
# news.insert_one({'name':'duck','age':22}) 

## 5. news 데이터 조회
# news = db['news'].find_one({'name' : 'duck'})
# print('### news : ', news)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # 허용할 HTTP 메소드
    allow_headers=["*"],  # 모든 헤더를 허용할 경우
    allow_origins=['http://localhost:3000/', 'http://127.0.0.1:3000/']
)

from route import news_detail, save_db_service, news_list, news_views, news_ranking

app.include_router(news_detail.router)
app.include_router(save_db_service.router)
app.include_router(news_list.router)
app.include_router(news_views.router)
app.include_router(news_ranking.router)

@app.get('/')
async def home(request: Request):
    return { 'message': 'success' }

# news api example
from newsapi import NewsApiClient

@app.get('/news')
async def news(question: str):
    # Init
    newsapi = NewsApiClient(api_key='c161ea8b106b43d5884f93dd0ee2910f')

    # /v2/top-headlines
    top_headlines = newsapi.get_top_headlines(q=question, category='business')

    # /v2/everything
    # all_articles = newsapi.get_everything(q=question, sources='bbc-news,the-verge', domains='bbc.co.uk,techcrunch.com', from_param='2017-12-01', to='2017-12-12', language='en', sort_by='relevancy', page=2)

    # /v2/top-headlines/sources
    # sources = newsapi.get_sources()

    print('top_headlines : ', top_headlines)
    return { 'top_headlines': top_headlines }


# import torch
# from transformers import PreTrainedTokenizerFast, BartForConditionalGeneration
# # 모델과 토크나이저를 로드합니다.
# tokenizer = PreTrainedTokenizerFast.from_pretrained("gogamza/kobart-summarization")
# model = BartForConditionalGeneration.from_pretrained("gogamza/kobart-summarization")

# @app.get('/news2')
# async def news2():
#     # 요약하고자 하는 기사를 입력합니다.
#     news_text = "10일 서울외국환중개에 따르면 이날 환율은 오전 9시 27분 기준 전 거래일 종가(1365.3원)보다 15.7원 오른 1381.0원에 거래 중이다. 간밤 뉴욕차액결제선물환(NDF) 시장에서 거래된 원·달러 1개월물은 1378.0원에 최종 호가됐다. 최근 1개월물 스와프 포인트(-2.25원)를 고려하면 이날 환율은 전 거래일 종가(1365.3원) 대비 14.95원 상승 개장할 것으로 예상됐다. 이날 환율은 역외 환율을 반영해 전 거래일 종가보다 14.2원 오른 1379.5원에 개장했다. 이후 환율은 1380원대로 올라 움직이고 있다. 5월 미국의 비농업 일자리는 전월 대비 27만2000개 늘었다. 다우존스가 집계한 전문가 전망치 18만개와 전월 증가 폭 17만5000개를 큰 폭으로 웃돈 것이다. 비농업 부문 민간 임금근로자의 시간당 평균 소득은 14센트(0.4%) 증가한 34.91달러를 기록했다. 이는 지난달 상승폭(0.2%)의 두배에 달하는 수치다. 전년 동기 대비로도 4.1% 올랐다. 다만 5월 실업률은 4.0%로, 4월(3.9%)보다 소폭 올라갔다. 시카고상품거래소(CME) 페드워치에 따르면 9월 금리가 인하될 확률은 49%로 뚝 떨어졌다. 지난주 만 해도 약 70%를 가리켰다. 12월 기준금리가 5.0% 이하로 떨어질 확률은 45.5% 정도다. 달러화는 다시 강세를 나타냈다. 달러인덱스는 9일(현지시간) 저녁 8시 27분 기준 105.11을 기록하고 있다. 지난주 104에서 105로 오른 것이다. 아시아 통화는 약세다. 달러·위안 환율은 7.26위안대, 달러·엔 환율은 156엔대에서 거래되고 있다. 장 초반 외국인 투자자는 국내 증시에서 순매도하고 있다. 외국인은 코스피 시장에서 800억원대, 코스닥 시장에서 700억원대를 팔고 있다."

#     # 토크나이저를 사용하여 뉴스기사 원문을 모델이 인식할 수 있는 토큰형태로 바꿔줍니다.
#     input_ids = tokenizer.encode(news_text, return_tensors="pt")

#     # 모델에 넣기 전 문장의 시작과 끝을 나타내는 토큰을 추가합니다.
#     input_ids = torch.cat([torch.tensor([[tokenizer.bos_token_id]]), input_ids, torch.tensor([[tokenizer.eos_token_id]])], dim=1)

#     # 모델을 사용하여 요약을 생성합니다.
#     summary_text_ids = model.generate(
#         input_ids=input_ids,
#         length_penalty=1.0,  # 길이에 대한 penalty값. 1보다 작은 경우 더 짧은 문장을 생성하도록 유도하며, 1보다 클 경우 길이가 더 긴 문장을 유도
#         max_length=300,      # 요약문의 최대 길이 설정
#         min_length=32,       # 요약문의 최소 길이 설정
#         num_beams=4,         # 문장 생성시 다음 단어를 탐색하는 영역의 개수 
#     )

#     # 요약문을 출력합니다.
#     news = tokenizer.decode(summary_text_ids[0], skip_special_tokens=True)
#     print(news)
#     return { 'news': news }
