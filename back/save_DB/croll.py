""" 주식종목 뉴스(네이버 파이넌스) Crawling 하기 """  
 
 
import random
from bs4 import BeautifulSoup
import requests
import re
import pandas as pd
import os 
from urllib.parse import urlparse, parse_qs 
 # 현재 파일의 경로를 기준으로 상대 경로 지정
current_dir = os.path.dirname(os.path.abspath(__file__))
log_dir = os.path.join(current_dir, 'log')
os.chdir(log_dir)
 
 
#   크롤 함수 (종목코드, 최대페이지)
def crawler(company_name,company_code, maxpage):

    print('company namne = ' , company_name ,'company code = ' , company_code) 
    
    page = 1 
    result ={}
    articles = []
    i = 0
    
    while page <= int(maxpage): 
    
        url = 'https://finance.naver.com/item/news_news.nhn?code=' + str(company_code) + '&page=' + str(page) 
        source_code = requests.get(url).text
        html = BeautifulSoup(source_code, "lxml")
     

      
        
        # 뉴스 제목 
        titles = html.select('.title')
        title_result=[]
        for title in titles: 
            title = title.get_text() 
            title = re.sub('\n','',title)
            title_result.append(title)
 
 
        # 뉴스 링크
        links = html.select('.title') 

        link_result =[]
        for link in links: 

            # https://finance.naver.com/item/news_read.naver?article_id=0011738954&office_id=056&code=005930&page=1&sm=
            add = 'https://finance.naver.com' + link.find('a')['href']
            
    
            # url = "https://n.news.naver.com/mnews/article/%s(sid)/%s(aid)" 로 변환 시켜야함
            parsed_url = urlparse(add)

            # 쿼리 매개변수 추출
            query_params = parse_qs(parsed_url.query)

            # office_id와 article_id 추출
            office_id = query_params.get('office_id', [None])[0]
            article_id = query_params.get('article_id', [None])[0]

            # 포맷 url 저장
            url = f"https://n.news.naver.com/mnews/article/{office_id}/{article_id}"
            link_result.append(url)
 
 
        # 뉴스 날짜 
        dates = html.select('.date') 
        date_result = [date.get_text() for date in dates] 
 
 
        # 뉴스 매체     
        sources = html.select('.info')
        source_result = [source.get_text() for source in sources] 
 
 
        # 변수들 합쳐서 해당 디렉토리에 csv파일로 저장하기 
 
        result= {"dates" : date_result, "medias" : source_result, "titles" : title_result, "links" : link_result} 
        # df_result = pd.DataFrame(result)
        
        # print("다운 받고 있습니다------")
        # df_result.to_csv(company_code + str(page) + '.csv', mode='w', encoding='utf-8-sig') 
            
 

 
     
         # 결과를 articles 리스트에 추가
        for i in range(len(result['dates'])):
            # 좋아요 0 ~ 100
            # 조회수 0~ 1000
            
            like = random.randint(0, 100)
            views = random.randint(0,1000)

            article = {
                'company_code':company_code,
                'company_name':company_name,
                'date': result['dates'][i],
                'media': result['medias'][i],
                'title': result['titles'][i],
                'link': result['links'][i],
                'like' : like,
                'views':views,
            }
            
            articles.append(article)
            print('views = ' , views , 'like = ' , like)

        # 페이지 증가
        page += 1


    return articles
 
 
    
 
# 종목 리스트 파일 열기  
# 회사명을 종목코드로 변환 
        
def convert_to_code(company,maxpage):
    
      # 종목코드와 회사명 데이터 불러오기
    data = pd.read_csv('company_list.txt', dtype=str, sep='\t')
    company_name = data['회사명']
    
    # 리스트로 변환
    keys = [i for i in company_name]
    company_code = data['종목코드']
    values = [j for j in company_code]
    
    # 회사명과 종목코드를 딕셔너리로 묶기
    dict_code_to_name = dict(zip(values, keys))  # 종목코드 -> 회사명
    dict_name_to_code = dict(zip(keys, values))  # 회사명 -> 종목코드
    
    # 패턴 정의 (한글, 알파벳)
    pattern = '[a-zA-Z가-힣]+'
    
    # 입력이 회사 이름일 경우
    if bool(re.match(pattern, company)) == True:
        company_name = company
        company_code = dict_name_to_code.get(str(company),None)
    # 입력이 종목 코드일 경우
    else:
        company_name = dict_code_to_name.get(str(company), None)
        company_code = company
    
    if company_name:
        return crawler(company_name,company_code, maxpage)
    else:
        raise ValueError("유효한 회사 이름 또는 종목 코드를 입력해주세요.")
        
           

 

 
 
 
