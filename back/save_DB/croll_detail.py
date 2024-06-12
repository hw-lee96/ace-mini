import requests
from bs4 import BeautifulSoup
import re

def get_content_img(articles):

    for article in articles:
        # url 주소를 받아 웹에 접근
        url = article['link']
  
        response = requests.get(url)

        # 접근한 웹에 HTML 가져오기
        html = response.text 

        # BeautifulSoup를 통해 HTML 태그 해석
        soup = BeautifulSoup(html,"html.parser")

        # 가져온 soup에 #dic_area 접근하여 내용가져오기
        content_tag = soup.select_one("#dic_area")

        # 앞뒤 공백 제거
        content = content_tag.text.strip()

        # 문자열 내부의 다중 공백을 단일 공백으로 변경
        content = re.sub(r'\s+', ' ', content)
    

     
     

        # 가져온 soup에 #img1 접근하여 이미지 첫번쨰것만 가져오기 
        img_tag = soup.select_one("#img1")

        # 이미지가 없을 경우를 대비해서 
        img = '' 

        # 이미지 엘리먼트가 있으면 src 가져오기
        if img_tag != None:
            img = img_tag['data-src']
        

        
        # 해당 article에 content와 img 추가
        article['content'] = content
        article['img'] = img

    return articles


  




