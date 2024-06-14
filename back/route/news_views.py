from fastapi import APIRouter
from main import db
from bson import ObjectId


router = APIRouter(
    prefix="/api/news",
)

# DB에서 컬렉션 가져오기
news_collection = db['news']


@router.get('/{news_id}/increase-views')
def get_news_detail(news_id: str):

    # 해당하는 ID의 뉴스 얻어오기
    article = news_collection.find_one({"_id": ObjectId(news_id)})

    print('뉴스 ID = ',news_id ,'업데이트 전 뷰 = ' , article.get('views', 0) )

    # 뉴스의 views를 얻기
    views = article.get('views')  

    # 해당 뉴스의 views를 +1 업데이트 하기 위한 views
    update_views = views+1

    #UPDATE 문 
    news_collection.update_one(
            {"_id": ObjectId(news_id)},
            {"$set": {"views": update_views}}
        )

    article = news_collection.find_one({"_id": ObjectId(news_id)})

    print('뉴스 ID = ',news_id , '업데이트 후 뷰  =  ' , article.get('views', 0) )

    return update_views