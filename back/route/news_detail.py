from fastapi import APIRouter, HTTPException
import main 
from bson import ObjectId
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/news",
    tags= ['news detail']
)

news_collection = main.news


class News(BaseModel):
    company_name: str
    title: str
    date: str
    media: str
    link: str
    img : str
    summary: str
    cls_results: str
    
def news_serializer(news) -> dict:
    return {
        "id" : str(news["_id"]),
        "company_name" : news["company_name"],
        "title": news["title"],
        "date" : news["date"],
        "media": news["media"],
        "img" : news['img'],
        "link": news["link"],
        "summary": news["summary"],
        "cls_results": news["cls_results"],
    }
    
    
@router.get("/detail/{id}", response_model=News)
async def get_news_detail(id : str):
    
    news = news_collection.find_one({"_id": ObjectId(id)})
    if news is None:
        raise HTTPException(status_code=404, detail="뉴스 찾아도 안나옴")
    
    return news_serializer(news)



@router.get("/related/{company_name}/{exclude_id}")
async def get_related_news(company_name : str, exclude_id: str):
    
    # 몽고DB 쿼리를 사용하여 같은회사의 2개 기사를 중복없이 get하기
    related_articles = list(news_collection.find({
        
        "company_name": company_name,   # 같은 회사 이름을 가진 기사만 선택
        "_id": {'$ne': ObjectId(exclude_id)}    # 현재기사와 중복 금지 '$ne'
        
    }).sort('date', -1).limit(2))
    
    for article in related_articles:
        article['_id'] = str(article['_id'])    # MongoDB ObjectId를 문자열로 변환
 
    return related_articles

