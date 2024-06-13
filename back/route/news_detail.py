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
        raise HTTPException(status_code=404, detail="뉴스가 찾아도 안나옴")
    
    return news_serializer(news)

@router.get("/detail")
async def test():
    
 
    return {'test':'success '}

