""" 주식종목 뉴스(네이버 파이넌스) Crawling 하기 """  
 
 
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
def crawler(company_code, maxpage):
    
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
            article = {
                'company_code':company_code,
                'date': result['dates'][i],
                'media': result['medias'][i],
                'title': result['titles'][i],
                'link': result['links'][i],
            }
            articles.append(article)

        # 페이지 증가
        page += 1


    return articles
 
 
    
 
# 종목 리스트 파일 열기  
# 회사명을 종목코드로 변환 
        
def convert_to_code(company, maxpage):
    
    data = pd.read_csv('company_list.txt', dtype=str, sep='\t')   # 종목코드 추출 
    company_name = data['회사명']
    keys = [i for i in company_name]    #데이터프레임에서 리스트로 바꾸기 
 
    company_code = data['종목코드']
    values = [j for j in company_code]
 
    dict_result = dict(zip(keys, values))  # 딕셔너리 형태로 회사이름과 종목코드 묶기 
    
    pattern = '[a-zA-Z가-힣]+' 
    
    if bool(re.match(pattern, company)) == True:         # Input에 이름으로 넣었을 때  
        company_code = dict_result.get(str(company))
        return crawler(company_code, maxpage)  
 
    
    else:                                                # Input에 종목코드로 넣었을 때       
        company_code = str(company)      
        return crawler(company_code, maxpage)  #
