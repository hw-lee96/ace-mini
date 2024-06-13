from transformers import pipeline
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, parse_qs

# # 기사 크롤링 1차: 기사 url 가져오기
# headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
# html = requests.get('https://finance.naver.com/item/news_news.nhn?code=005930',headers=headers)

# soup = BeautifulSoup(html.text, 'html.parser')

# data = soup.select_one('body > div > table.type5 > tbody > tr.first > td.title > a')

# link = data['href']
# parsed_link = urlparse(link)
# query_params = parse_qs(parsed_link.query)

# article_id = query_params.get('article_id', [None])[0]
# office_id = query_params.get('office_id', [None])[0]

# print("추출된 office_id:", article_id, office_id)

# # news_url
# news_url_template = "https://n.news.naver.com/mnews/article/{office_id}/{article_id}"
# news_url = news_url_template.format(office_id=office_id, article_id=article_id)

# print(news_url)

# # 기사 크롤링 2차: 기사 본문 가져오기
# html2 = requests.get(news_url,headers=headers)
# soup2 = BeautifulSoup(html2.text, 'html.parser')
# media = soup2.select_one("#ct > div.media_end_head.go_trans > div.media_end_head_top._LAZY_LOADING_WRAP > a")

# print(media['title'])



# 번역 모델
translate_model = pipeline("translation", "facebook/nllb-200-distilled-600M")

# 감정 분석 모델 로드
sentiment_model = pipeline("sentiment-analysis", "mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis")

# 예제 텍스트
text = """
산타클라라에 본사를 둔 거대 반도체 기업 엔비디아에 호재가 쏟아지고 있다. 주가가 1년 전보다 세 배 이상 올랐고, 
시가총액 3조 달러를 돌파해 세계에서 두 번째로 가치가 높은 기업이 됐다. 지난 분기 매출은 전년 동기 대비 262% 증가했다.
반면 지구 반대편 한국의 반도체 기업 삼성전자는 고전 중이다. 
삼성전자의 주가는 몇 번의 반짝 급등을 제외하면 3년 동안 7만원(51달러) 또는 그 이하에 머물렀다. "
"""

# 사용자가 입력한 주체
subject = input("주체를 입력하세요: ")

# 주체와 관련된 텍스트 추출
related_sentences = [sentence.strip() for sentence in text.split('.') if subject in sentence]
joined_text = '. '.join(related_sentences)

# 텍스트 번역
translated_text = translate_model(joined_text, src_lang="kor_KO", tgt_lang="eng_Latn")[0]['translation_text']
print(f"번역된 텍스트: {translated_text}")

# 주체와 관련된 텍스트에 대해 감정 분석 수행
# for sentence in related_text:
sentiment = sentiment_model(translated_text)
print(f"주체: {subject}, 텍스트: {translated_text}, 감정 분석 결과: {sentiment}")


