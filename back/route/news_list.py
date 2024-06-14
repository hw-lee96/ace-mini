#  뉴스기능인데 1번 STEP 이다
#  무슨 역할을 한다. 핀버트가 역할이다 . 

import random
from fastapi import APIRouter
from main import db


router = APIRouter(
    prefix="/api/news/list",
)

# 리스트에 

# /api/news/list?type=pinbert&value=possive
# /api/news/list?type=like&value=desc
# /

news_collection = db['news']


@router.get("/pinbert/{result}")
def get_news_list(result : str):
   

    # news 테이블에서 result 값이 {result = positive , negative, neutral}를 통해 리스트 가져오기
    sort_news_list = list(news_collection.find({'result': result}))  # Cursor 객체를 리스트로 변환
    print('정렬 전 =', sort_news_list)

    random.shuffle(sort_news_list)  # 리스트를 섞기
    print('정렬 후 =', sort_news_list)

    # 분류 된 기사 레코드를 저장할 배열 생성
    sort_cls_list = []
    # 가져온 리스트를 꺼내 서 id를 문자열로 바꾼 후 배열에 저장 
    for news in sort_news_list:
        news['id'] = str(news['_id'])
        del news['_id']  # _id 필드를 삭제 (선택 사항)
        sort_cls_list.append(news)

  
    # 결과 값 리턴
    return sort_cls_list


# let type = pinbert 
# let value = possive 
# axios.get(`api/news/list?type=${type}&value=${value}`)

def news_list_serializer(news) -> dict:
    return {
        "id" : str(news["_id"]),
        "company_name" : news['company_name'],
        "title": news["title"],
        "date" : news["date"],
        "summary": news["summary"],
        "img": news["img"],
        "like": news["like"],
        "views": news["views"],
    }
    
@router.get('/{page}')
def get_news_detail(page:int = 1):
    newsList = list(news_collection.find())
    random.shuffle(newsList)
    newsList = [news_list_serializer(news) for news in newsList]
    return newsList