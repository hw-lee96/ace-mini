import requests
from bs4 import BeautifulSoup
import re

# 뉴스 기사 내용 및 이미지 가져오기
def get_content_img(articles):
    for article in articles:
        # url 주소를 받아 웹에 접근
        if article is None:
            print("None article detected, skipping.")
            continue
        try:
            url = article['link']
        
            response = requests.get(url)
            # 접근한 웹에 HTML 가져오기
            html = response.text 
            # BeautifulSoup를 통해 HTML 태그 해석
            soup = BeautifulSoup(html,"html.parser")

            # 뉴스 본문 가져오기
            # 가져온 soup에 #dic_area 접근하여 내용가져오기
            content_tag = soup.select_one("#dic_area")
            if content_tag:
                # 앞뒤 공백 제거
                content = content_tag.text.strip()
                # 문자열 내부의 다중 공백을 단일 공백으로 변경
                content = re.sub(r'\s+',' ', content)
                article['content'] = content
            else:
                article['content'] = ''
    
            # 뉴스 이미지 가져오기 
            # 가져온 soup에 #img1 접근하여 이미지 첫번쨰것만 가져오기 
            img_tag = soup.select_one("#img1")
            # 이미지가 없을 경우를 대비해서 
            article['img'] = img_tag['data-src'] if img_tag else ''
    
        except KeyError as e:
                print(f"KeyError: {e}")
        except requests.RequestException as e:
                print(f"Request failed: {e}")

    return articles


  




