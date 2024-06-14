from bs4 import BeautifulSoup
import requests
import re
import pandas as pd
from urllib.parse import urlparse, parse_qs
from datetime import datetime
import os

# 현재 파일의 경로를 기준으로 상대 경로 지정
current_dir = os.path.dirname(os.path.abspath(__file__))
log_dir = os.path.join(current_dir, 'log')
os.chdir(log_dir)


# 크롤 함수 (종목코드, 최대페이지)
def crawler(company_code, maxpage,):
    page = 1
    articles = []

    while page <= int(maxpage):
        url = f'https://finance.naver.com/item/news_news.nhn?code={company_code}&page={page}'
        source_code = requests.get(url).text
        html = BeautifulSoup(source_code, "lxml")

        # 뉴스 제목
        titles = html.select('.title')
        title_result = [re.sub('\n', '', title.get_text()) for title in titles]

        # 뉴스 링크
        links = html.select('.title')
        link_result = []
        for link in links:
            add = 'https://finance.naver.com' + link.find('a')['href']

            # Naver 뉴스 URL 포맷으로 변환
            parsed_url = urlparse(add)
            query_params = parse_qs(parsed_url.query)
            office_id = query_params.get('office_id', [None])[0]
            article_id = query_params.get('article_id', [None])[0]
            if office_id and article_id:
                url = f"https://n.news.naver.com/mnews/article/{office_id}/{article_id}"
                link_result.append(url)

        # 뉴스 날짜
        dates = html.select('.date')
        date_result = [date.get_text() for date in dates]

        # 뉴스 매체
        sources = html.select('.info')
        source_result = [source.get_text() for source in sources]

        # 결과를 articles 리스트에 추가
        for i in range(len(date_result)):
            article = {
                'company_code': company_code,
                'date': date_result[i],
                'media': source_result[i],
                'title': title_result[i],
                'link': link_result[i],
            }
            articles.append(article)

        # 페이지 증가
        page += 1

    return articles


# 종목 리스트 파일 열기,
# 회사명을 종목코드로 변환
def convert_to_code(company, maxpage, start_date, end_date):
    data = pd.read_csv('company_list.txt', dtype=str, sep='\t')
    company_name = data['회사명']
    keys = [i for i in company_name]

    company_code = data['종목코드']
    values = [j for j in company_code]

    dict_result = dict(zip(keys, values))

    pattern = '[a-zA-Z가-힣]+'

    if bool(re.match(pattern, company)):
        company_code = dict_result.get(str(company))
        if company_code:
            return crawler(company_code, maxpage, start_date, end_date)
        else:
            print(f"종목 이름 '{company}'에 해당하는 종목 코드를 찾을 수 없습니다.")
            return None
    else:
        company_code = str(company)
        return crawler(company_code, maxpage, start_date, end_date)


articles = convert_to_code(company_code, maxpage, start_date, end_date):

# 결과 출력
for article in articles:
    print(article)