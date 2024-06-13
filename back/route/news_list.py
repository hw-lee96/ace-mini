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

@router.get("/pinbert/{result}")
def get_news_list(result : str):
   

    sort_news_list = db['news'].find({'result' : result})


    #   MongoDB의 ObjectId를 문자열로 변환하여 문서를 반환
    news_list = []
    for news in sort_news_list:
        news['_id'] = str(news['_id'])
        news_list.append(news)

    print(news_list)    

    



    return [{'test': 'test list '}]


# let type = pinbert 
# let value = possive 
# axios.get(`api/news/list?type=${type}&value=${value}`)