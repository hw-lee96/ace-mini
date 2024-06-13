#  뉴스기능인데 1번 STEP 이다
#  무슨 역할을 한다. 핀버트가 역할이다 . 

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
   

    # news 테이블에서 result 값이 {result = positive , negative, natural}를 통해 리스트 가져오기
    sort_news_list = news_collection.find({'result' : result})


    # 분류 된 기사 레코드를 저장할 배열 생성 
    sort_cls_list = []

    # 가져온 리스트를 꺼내 서 id를 문자열로 바꾼 후 배열에 저장 
    for news in sort_news_list:
        news['_id'] = str(news['_id'])
        sort_cls_list.append(news)

    # print(    sort_cls_list)

  
    # 결과 값 리턴
    return sort_cls_list


# let type = pinbert 
# let value = possive 
# axios.get(`api/news/list?type=${type}&value=${value}`)

def news_list_serializer(news) -> dict:
    return {
        "id" : str(news["_id"]),
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
    newsList = [news_list_serializer(news) for news in newsList]
    return newsList